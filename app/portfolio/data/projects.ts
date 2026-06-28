export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Design System & Component Library",
    description:
      "A fully typed React component library with dark mode, responsive utilities, and a custom CSS-in-JS engine. Built to replace Tailwind in cross-platform (web + React Native) projects.",
    tech: ["React", "TypeScript", "Vite", "CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: "02",
    title: "E-Commerce Storefront",
    description:
      "A pixel-perfect storefront UI with animated product cards, cart drawer, and checkout flow. Integrated with a headless CMS and third-party payment UI.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com",
    featured: false,
  },
  {
    id: "03",
    title: "Analytics Dashboard",
    description:
      "An interactive data visualization dashboard with real-time charts, dark mode, responsive grid layout, and CSV export.",
    tech: ["React", "TypeScript", "D3.js", "CSS Modules"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: false,
  },
];
