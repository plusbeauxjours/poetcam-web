import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { image } = await req.json();
    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }
    const base64 = image.replace(/^data:image\/[^;]+;base64,/, '');
    const body = {
      model: 'claude-3-sonnet-20240229',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: '다음 사진을 보고 한국어로 짧은 감성적인 시를 4행 정도로 써줘.' },
            {
              type: 'image',
              source: { type: 'base64', media_type: 'image/png', data: base64 },
            },
          ],
        },
      ],
    };

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY ?? '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(await res.text());
      return NextResponse.json({ error: 'Failed to generate poem' }, { status: 500 });
    }

    const data = await res.json();
    const text = data?.content?.[0]?.text || '';
    return NextResponse.json({ poem: text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
