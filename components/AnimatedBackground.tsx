import DotField from "@/components/DotField";
export default function AnimatedBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-vignette" />
      <DotField />
      <div className="ambient-grain" />
    </div>
  );
}
