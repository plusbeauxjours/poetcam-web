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
            {
              type: "text",
              text: "당신은 세계적인 시인이며, 이미지에서 느껴지는 감정과 분위기를 섬세하고 시적으로 표현하는 데 탁월합니다. 아래 이미지를 천천히 관찰하세요. 이미지에 담긴 분위기, 색감, 구도, 시간대, 등장 인물 또는 사물의 의미를 깊이 있게 느끼고, 그 감정을 바탕으로 **짧고 아름다운 자유시**를 지어주세요. - 시는 너무 직접적이지 않고, 은유와 상징을 포함합니다. - 최대 5행으로, 압축적이고 감성적인 언어를 사용하세요. - 독자가 사진 속에 들어가 있는 듯한 몰입감을 주는 표현이면 좋습니다. - 시의 끝에는 마침표를 쓰지 마세요 (의도적으로 여운을 남기기 위함입니다).[이미지 첨부]",
            },
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
