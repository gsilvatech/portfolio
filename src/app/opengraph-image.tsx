import { ImageResponse } from "next/og";

export const alt = "Gabriel Ferreira — Full Stack Developer & Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background:
            "radial-gradient(circle at 12% 10%, rgba(139,92,246,0.45), transparent 45%), radial-gradient(circle at 92% 95%, rgba(236,72,153,0.4), transparent 45%), #121214",
          color: "#f4f4f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#a1a1aa" }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            }}
          />
          GSILVATECH
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1.05,
            backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Gabriel Ferreira
        </div>
        <div style={{ marginTop: 26, fontSize: 44, color: "#f4f4f5" }}>
          Full Stack Developer · Software Engineer
        </div>
        <div style={{ marginTop: 18, fontSize: 28, color: "#a1a1aa" }}>
          TypeScript · React · Next.js · Python · Supabase
        </div>
      </div>
    ),
    { ...size },
  );
}
