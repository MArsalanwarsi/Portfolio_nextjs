import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

export const alt = `${siteConfig.name}, ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const [firstName, ...remainingNames] = siteConfig.name.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          background: "#121212",
          color: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "56px 64px",
          position: "relative",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", width: 650, height: 650, right: -90, top: -210, border: "1px solid #3d3d3d", borderRadius: "50%", display: "flex" }} />
        <div style={{ position: "absolute", inset: 24, border: "1px solid #3d3d3d", borderRadius: 32, display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22 }}>
          <span>{siteConfig.role}</span>
          <span style={{ color: "#a6a6a6" }}>{siteConfig.location}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 700, lineHeight: 1.1, letterSpacing: -4 }}>
          <span>{firstName}</span>
          <span style={{ alignSelf: "flex-end" }}>{remainingNames.join(" ")}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24 }}>
          <span style={{ color: "#a6a6a6" }}>{siteConfig.specialization}</span>
          <span style={{ color: "#121212", background: "#f5f5f5", padding: "16px 32px", borderRadius: 999 }}>Explore my portfolio ↗</span>
        </div>
      </div>
    ),
    size
  );
}
