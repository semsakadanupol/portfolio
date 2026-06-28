import { useGlobalDarkMode } from "@kbach/react";
import Navbar from "./components/navbar";
import ProfileSection from "./components/sections/profile";
import AboutSection from "./components/sections/about";
import ProjectsSection from "./components/sections/projects";
import ContactSection from "./components/sections/contact";
import Footer from "./components/footer";
import ScrollProgress from "./components/ui/ScrollProgress";
import CursorGlow from "./components/ui/CursorGlow";
import FloatingControls from "./components/ui/FloatingControls";
import { MotionProvider } from "./hooks/useMotion";

export default function Porfolio() {
  const isDark = useGlobalDarkMode();

  const pageBg = isDark
    ? [
        "radial-gradient(ellipse 70% 35% at 15% 5%, rgba(99,102,241,0.12) 0%, transparent 100%)",
        "radial-gradient(ellipse 60% 30% at 85% 90%, rgba(139,92,246,0.10) 0%, transparent 100%)",
        "linear-gradient(to bottom, #0c0c14 0%, #0f0c1c 30%, #0c1020 55%, #100c1c 80%, #0d0c14 100%)",
      ].join(", ")
    : [
        "radial-gradient(ellipse 70% 35% at 15% 5%, rgba(99,102,241,0.08) 0%, transparent 100%)",
        "radial-gradient(ellipse 60% 30% at 85% 90%, rgba(139,92,246,0.06) 0%, transparent 100%)",
        "linear-gradient(to bottom, #ffffff 0%, #f7f5ff 30%, #f3f6ff 55%, #f5f3ff 80%, #f8f7ff 100%)",
      ].join(", ");

  return (
    <MotionProvider>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1, background: pageBg }}
      />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <FloatingControls />
      <main>
        <ProfileSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </MotionProvider>
  );
}
