import { NextResponse } from "next/server";
import {
  extractBase64FromDataUrl,
  detectImageFormat,
  getMediaType,
  isValidBase64,
  hasMinimumSize,
} from "@/utils/image";
import { CLAUDE_CONFIG, ERROR_MESSAGES } from "@/constants";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: ERROR_MESSAGES.api.imageRequired }, { status: 400 });
    }

    // 이미지 데이터 처리
    const base64 = extractBase64FromDataUrl(image);
    const imageFormat = detectImageFormat(image);
    const mediaType = getMediaType(imageFormat);

    // base64 유효성 검사
    if (!isValidBase64(base64)) {
      console.error("Invalid base64 format:", base64.substring(0, 50) + "...");
      return NextResponse.json({ error: ERROR_MESSAGES.image.invalidBase64 }, { status: 400 });
    }

    if (!hasMinimumSize(base64)) {
      console.error("Base64 data too short:", base64.length);
      return NextResponse.json({ error: ERROR_MESSAGES.image.tooSmall }, { status: 400 });
    }

    // Claude API 요청 본문 구성
    const requestBody = {
      model: CLAUDE_CONFIG.model,
      max_tokens: CLAUDE_CONFIG.maxTokens,
      messages: [
        {
          role: "user" as const,
          content: [
            {
              type: "text" as const,
              text: CLAUDE_CONFIG.systemPrompt,
            },
            {
              type: "image" as const,
              source: {
                type: "base64" as const,
                media_type: mediaType,
                data: base64,
              },
            },
          ],
        },
      ],
    };

    // Claude API 호출
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API Error:", errorText);
      return NextResponse.json({ error: ERROR_MESSAGES.api.poemGenerationFailed }, { status: 500 });
    }

    const data = await response.json();
    const poem = data?.content?.[0]?.text || "";

    if (!poem) {
      console.error("Empty poem response from Claude API");
      return NextResponse.json({ error: ERROR_MESSAGES.api.poemGenerationFailed }, { status: 500 });
    }

    return NextResponse.json({ poem });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: ERROR_MESSAGES.api.serverError }, { status: 500 });
  }
}
