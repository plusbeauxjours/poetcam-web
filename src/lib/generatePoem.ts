export async function generatePoem(image: string): Promise<string> {
  const res = await fetch('/api/generate-poem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image }),
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error('Failed to generate poem');
  }
  const data = await res.json();
  return data.poem as string;
}
