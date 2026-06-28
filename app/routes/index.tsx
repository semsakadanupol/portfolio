import type { Route } from "./+types";
import Portfolio from "../portfolio/porfolio";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My - Portfolio" },
    {
      name: "description",
      content: "Portfolio of Sem Sakadnupol.",
    },
  ];
}

export default function Home() {
  return <Portfolio />;
}
