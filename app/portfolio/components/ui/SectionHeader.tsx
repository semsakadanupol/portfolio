import { cx } from "@kbach/react";
import { sectionTitle, bodyText } from "./preBuildStyle";

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({ title, subtitle, center = false }: Props) {
  return (
    <div className={cx("mb-12", center && "text-center")}>
      <h2 className={sectionTitle}>{title}</h2>
      {subtitle && <p className={cx(bodyText, "mt-2 text-sm")}>{subtitle}</p>}
      <div className={cx("mt-4 h-1 w-12 rounded-full bg-indigo-6", center && "mx-auto")} />
    </div>
  );
}
