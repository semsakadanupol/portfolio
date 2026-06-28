import { useEffect, useRef } from 'react';
import { useGlobalDarkMode } from '@kbach/react';

const CELL = 40;
const MAX_DROPS = 35;
const GLOW_R = 14;
const TRAIL_PX = 72;
const COLORS = ['99,102,241', '139,92,246', '34,211,238', '167,139,250'];

interface Drop {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function GridMatrixBg() {
  const isDark = useGlobalDarkMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drops: Drop[] = [];
    let raf: number;

    function resize() {
      const p = canvas!.parentElement;
      if (!p) return;
      canvas!.width = p.offsetWidth;
      canvas!.height = p.offsetHeight;
    }

    function spawn() {
      const w = canvas!.width;
      const h = canvas!.height;
      const cols = Math.ceil(w / CELL);
      const rows = Math.ceil(h / CELL);
      const horiz = Math.random() > 0.5;
      const speed = 0.8 + Math.random() * 1.8;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const maxLife = 180 + Math.random() * 280;

      let x: number, y: number, vx: number, vy: number;
      if (horiz) {
        const row = Math.floor(Math.random() * rows);
        const fromLeft = Math.random() > 0.5;
        x = fromLeft ? 0 : w;
        y = row * CELL;
        vx = fromLeft ? speed : -speed;
        vy = 0;
      } else {
        const col = Math.floor(Math.random() * cols);
        x = col * CELL;
        y = 0;
        vx = 0;
        vy = speed;
      }

      drops.push({ x, y, vx, vy, color, life: 0, maxLife });
    }

    function drawGrid() {
      const lineColor = isDark
        ? 'rgba(148,163,184,0.06)'
        : 'rgba(100,116,139,0.11)';
      ctx!.strokeStyle = lineColor;
      ctx!.lineWidth = 1;

      const w = canvas!.width;
      const h = canvas!.height;

      for (let x = 0; x <= w; x += CELL) {
        ctx!.beginPath();
        ctx!.moveTo(x + 0.5, 0);
        ctx!.lineTo(x + 0.5, h);
        ctx!.stroke();
      }
      for (let y = 0; y <= h; y += CELL) {
        ctx!.beginPath();
        ctx!.moveTo(0, y + 0.5);
        ctx!.lineTo(w, y + 0.5);
        ctx!.stroke();
      }
    }

    function frame() {
      const w = canvas!.width;
      const h = canvas!.height;

      ctx!.clearRect(0, 0, w, h);
      drawGrid();

      if (drops.length < MAX_DROPS && Math.random() < 0.05) spawn();

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.x += d.vx;
        d.y += d.vy;
        d.life++;

        if (
          d.life > d.maxLife ||
          d.x < -CELL || d.x > w + CELL ||
          d.y < -CELL || d.y > h + CELL
        ) {
          drops.splice(i, 1);
          continue;
        }

        const t = d.life / d.maxLife;
        // Ease in + ease out alpha
        const alpha = Math.sin(t * Math.PI) * 0.85;

        // Glow halo
        const grd = ctx!.createRadialGradient(d.x, d.y, 0, d.x, d.y, GLOW_R * 2);
        grd.addColorStop(0, `rgba(${d.color},${(alpha * 0.55).toFixed(3)})`);
        grd.addColorStop(1, `rgba(${d.color},0)`);
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, GLOW_R * 2, 0, Math.PI * 2);
        ctx!.fillStyle = grd;
        ctx!.fill();

        // Bright core
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, 2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${d.color},${alpha.toFixed(3)})`;
        ctx!.fill();

        // Trail — goes backward along the travel direction
        const tx = d.vx !== 0 ? d.x - Math.sign(d.vx) * TRAIL_PX : d.x;
        const ty = d.vy !== 0 ? d.y - Math.sign(d.vy) * TRAIL_PX : d.y;
        const trail = ctx!.createLinearGradient(d.x, d.y, tx, ty);
        trail.addColorStop(0, `rgba(${d.color},${(alpha * 0.45).toFixed(3)})`);
        trail.addColorStop(1, `rgba(${d.color},0)`);
        ctx!.beginPath();
        ctx!.moveTo(d.x, d.y);
        ctx!.lineTo(tx, ty);
        ctx!.strokeStyle = trail;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    resize();
    frame();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
