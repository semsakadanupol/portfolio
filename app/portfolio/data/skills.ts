export interface SkillGroup {
  label: string;
  varName: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Frameworks",
    varName: "frameworks",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "React Native"],
  },
  {
    label: "Styling",
    varName: "styling",
    items: ["Tailwind CSS", "CSS / SCSS", "Framer Motion", "Figma"],
  },
  {
    label: "Tooling",
    varName: "tooling",
    items: ["Vite", "Git", "Webpack", "npm / pnpm", "VS Code"],
  },
];
