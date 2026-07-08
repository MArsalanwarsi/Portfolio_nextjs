import DotField from "@/components/DotField";

export default function AnimatedBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-vignette" />
      <DotField
        dotRadius={1.25}
        dotSpacing={17}
        cursorRadius={460}
        bulgeStrength={58}
        glowRadius={230}
        sparkle
        waveAmplitude={0.35}
        gradientFrom="rgba(255, 54, 93, 0.42)"
        gradientTo="rgba(168, 85, 247, 0.35)"
        glowColor="rgba(126, 34, 206, 0.34)"
      />
      <div className="ambient-grain" />
    </div>
  );
}
