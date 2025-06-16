'use client';

import { useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import PoemDisplay from '@/components/PoemDisplay';
import { generatePoem } from '@/lib/generatePoem';

export default function Home() {
  const [poem, setPoem] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCapture = async (image: string) => {
    setLoading(true);
    const result = await generatePoem(image);
    setPoem(result);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-white bg-black font-sans gap-8">
      {!poem && !loading && <CameraCapture onCapture={handleCapture} />}
      {loading && (
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p>시를 쓰는 중이에요…</p>
        </div>
      )}
      {poem && !loading && <PoemDisplay poem={poem} />}
    </main>
  );
}
