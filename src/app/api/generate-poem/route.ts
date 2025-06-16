import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();
    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }
    const base64 = image.replace(/^data:image\/[^;]+;base64,/, "").replace(/\s/g, "");

    // 이미지 포맷 감지
    const imageFormat = image.match(/^data:image\/([^;]+)/)?.[1] || "jpeg";
    const mediaType = imageFormat === "png" ? "image/png" : "image/jpeg";

    // base64 유효성 검사 (간단)
    if (!/^[A-Za-z0-9+/=]+$/.test(base64)) {
      console.error("Invalid base64 format:", base64.substring(0, 50) + "...");
      return NextResponse.json({ error: "Invalid base64 data" }, { status: 400 });
    }

    if (base64.length < 100) {
      console.error("Base64 data too short:", base64.length);
      return NextResponse.json({ error: "Image data too small" }, { status: 400 });
    }

    const body = {
      model: "claude-3-sonnet-20240229",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "다음 사진을 보고 한국어로 짧은 감성적인 시를 4행 정도로 써줘." },
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: base64 },
            },
          ],
        },
      ],
    };

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(await res.text());
      return NextResponse.json({ error: "Failed to generate poem" }, { status: 500 });
    }

    const data = await res.json();
    const text = data?.content?.[0]?.text || "";
    return NextResponse.json({ poem: text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
