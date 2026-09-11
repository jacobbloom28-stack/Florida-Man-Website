import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "./lib/siteConfig";

export const alt = "Florida Man of the Day";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#17191c",
          padding: "80px 96px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", width: 96, height: 10, borderRadius: 999, backgroundColor: "#FF5A36" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 36,
            fontSize: 108,
            fontWeight: 900,
            lineHeight: 1.02,
            textTransform: "uppercase",
            letterSpacing: -2,
            color: "#ffffff",
          }}
        >
          <span>Florida Man</span>
          <span style={{ color: "#FFBE3D" }}>of the Day</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            maxWidth: 880,
            fontSize: 30,
            fontWeight: 600,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          {SITE_DESCRIPTION}
        </div>

        <div style={{ display: "flex", marginTop: 56, gap: 12 }}>
          {["#FF5A36", "#FFBE3D", "#0FA895", "#EF3F7B", "#8B5CF6"].map((color) => (
            <div key={color} style={{ display: "flex", width: 64, height: 14, borderRadius: 999, backgroundColor: color }} />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
