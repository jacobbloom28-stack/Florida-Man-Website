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
          backgroundColor: "#171717",
          padding: "80px 96px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", width: 96, height: 10, backgroundColor: "#FF3E7F" }} />

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
          <span style={{ color: "#FFC93C" }}>of the Day</span>
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
          {["#FF6B35", "#FFC93C", "#00B8A9", "#FF3E7F", "#7B2FF7"].map((color) => (
            <div key={color} style={{ display: "flex", width: 64, height: 14, backgroundColor: color }} />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
