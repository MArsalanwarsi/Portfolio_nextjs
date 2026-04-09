interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={`section-header${align === "center" ? " center" : ""}`}>
      <span className="section-kicker">{eyebrow}</span>
      <h2 className="section-heading">
        {title} <span>{accent}</span>
      </h2>
      {description ? <p className="section-copy">{description}</p> : null}
    </div>
  );
}
