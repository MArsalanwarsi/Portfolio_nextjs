import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "mb-10 max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <Badge
        variant="outline"
        className="mb-4 h-7 rounded-full border-primary/20 bg-primary/5 px-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-primary"
      >
        {eyebrow}
      </Badge>
      <h2 className="font-display text-4xl font-semibold leading-[0.95] tracking-normal text-balance sm:text-5xl lg:text-6xl">
        {title} <span className="text-primary">{accent}</span>
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
