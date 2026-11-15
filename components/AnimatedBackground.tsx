import ContourBackground from "@/components/ContourBackground";

export default function AnimatedBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-vignette" />
      <ContourBackground surface="dark" />
      <div className="ambient-grain" />
    </div>
  );
}
