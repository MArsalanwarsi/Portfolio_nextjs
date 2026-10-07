import { ImageResponse } from "next/og";

export const alt = "Muhammad Arsalan Warsi, Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "linear-gradient(135deg, #17110c 0%, #2b1e15 55%, #49301f 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "#d3a472",
          display: "flex",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 5,
        }}
      >
        FULL STACK DEVELOPER
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 78,
          fontWeight: 700,
          marginTop: 28,
          textAlign: "center",
        }}
      >
        Muhammad Arsalan Warsi
      </div>
      <div
        style={{
          color: "#ddcebc",
          display: "flex",
          fontSize: 34,
          marginTop: 28,
          textAlign: "center",
        }}
      >
        React · Next.js · Node.js · Express · MongoDB
      </div>
    </div>,
    size,
  );
}
