import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { imageBase64 } = await req.json();
  if (!imageBase64) {
    return NextResponse.json({ error: "imageBase64 is required" }, { status: 400 });
  }

  const base64 = typeof imageBase64 === "string"
    ? imageBase64.replace(/^data:image\/[^;]+;base64,/, "")
    : "";

  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "CLAUDE_API_KEY is not set" }, { status: 500 });
  }

  const body = {
    model: "claude-3-sonnet-20240229",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/jpeg",
              data: base64,
            },
          },
          {
            type: "text",
            text: "\uB2F9\uC2E0\uC740 \uC2DC\uC778\uC785\uB2C8\uB2E4. \uC544\uB798 \uC0AC\uC9C4\uC744 \uBCF4\uACE0 \uB290\uAFB8\uB294 \uAC10\uC815\uC744 5\uD589 \uC774\uB0B4\uC758 \uC9E7\uC740 \uC790\uC720\uC2DC\uB85C \uD45C\uD604\uD574 \uC8FC\uC138\uC694. \uC740\uC720\uC640 \uAC10\uC131\uC801\uC778 \uD45C\uD604\uC744 \uC0AC\uC6A9\uD574 \uC8FC\uC138\uC694. \uB9C8\uCE58\uD45C\uB294 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694."
          },
        ],
      },
    ],
  };

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ error: errorText }, { status: response.status });
  }

  const data = await response.json();
  const poem = data?.content?.[0]?.text ?? "";

  return NextResponse.json({ poem });
}
