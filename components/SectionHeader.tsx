import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/PremiumMotion";
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
    <Reveal
      amount={0.35}
      className={cn(
        "mb-10 max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
      y={18}
    >
      <Badge
        variant="outline"
        className="mb-4 h-7 rounded-full border-primary/25 bg-primary/8 px-3 text-xs font-medium text-primary"
      >
        {eyebrow}
      </Badge>
      <h2 className="font-display text-3xl font-semibold leading-[1.02] tracking-normal text-balance sm:text-4xl lg:text-5xl">
        {title} <span className="text-primary">{accent}</span>
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
