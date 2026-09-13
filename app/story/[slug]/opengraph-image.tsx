import { ImageResponse } from "next/og";
import { stories, storyIndexById } from "../../data/stories";
import { getStoryVisual, getScoreColor, getScoreLabel } from "../../components/StoryVisual";

export const alt = "Florida Man of the Day story preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const storyIndex = storyIndexById.get(slug);
  const story = storyIndex !== undefined ? stories[storyIndex] : undefined;

  if (!story) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1a1523",
            fontFamily: "sans-serif",
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            textTransform: "uppercase",
          }}
        >
          Florida Man of the Day
        </div>
      ),
      { ...size }
    );
  }

  const visual = getStoryVisual(story);
  const scoreColor = getScoreColor(story.score);

  // Headlines vary a lot in length — scale the font down for longer ones so
  // they still fit above the score row instead of overflowing the canvas.
  const titleFontSize =
    story.title.length > 90 ? 42 : story.title.length > 60 ? 50 : 58;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1a1523",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 60 }}>{visual.emoji}</div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: 3,
              color: "#FFC400",
            }}
          >
            {visual.label}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            maxHeight: 300,
            overflow: "hidden",
            fontSize: titleFontSize,
            fontWeight: 900,
            lineHeight: 1.15,
          }}
        >
          {story.title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "#FF2E7E",
              }}
            >
              {story.city}, Florida
            </div>
            <div style={{ display: "flex", marginTop: 8, fontSize: 20, color: "rgba(255,255,255,0.65)" }}>
              Florida Man of the Day
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 132,
              height: 132,
              borderRadius: "50%",
              border: "6px solid #ffffff",
              backgroundColor: scoreColor,
            }}
          >
            <div style={{ display: "flex", fontSize: 44, fontWeight: 900, color: "#1a1523" }}>
              {story.score}
            </div>
            <div
              style={{
                display: "flex",
                width: 108,
                textAlign: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 800,
                color: "#1a1523",
              }}
            >
              {getScoreLabel(story.score).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
