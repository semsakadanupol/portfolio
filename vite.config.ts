import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { kbach } from "@kbach/react/vite";

export default defineConfig({
  plugins: [reactRouter(), kbach()],
  base: "/portfolio/",
});
