import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#121212",
          color: "#f5f5f5",
          display: "flex",
          fontSize: 64,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: -5,
          width: "100%",
        }}
      >
        {siteConfig.portrait.initials}
      </div>
    ),
    size,
  );
}
