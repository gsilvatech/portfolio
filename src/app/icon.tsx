import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
          borderRadius: 16,
          color: "white",
          fontSize: 40,
          fontWeight: 800,
        }}
      >
        G
      </div>
    ),
    { ...size },
  );
}
