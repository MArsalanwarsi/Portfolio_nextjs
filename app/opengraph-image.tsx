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
          "linear-gradient(135deg, #202020 0%, #1e1e1e 55%, #151515 100%)",
        color: "#f4f4f4",
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
          color: "#eeeeee",
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
          color: "#f4f4f4",
        }}
      >
        Muhammad Arsalan Warsi
      </div>
      <div
        style={{
          color: "#dedede",
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
