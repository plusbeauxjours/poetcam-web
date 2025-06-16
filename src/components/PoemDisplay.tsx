'use client';
import { useEffect, useState } from 'react';

interface Props {
  poem: string;
}

export default function PoemDisplay({ poem }: Props) {
  const lines = poem.trim().split(/\r?\n/);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    const timer = setInterval(() => {
      setVisible((v) => {
        if (v >= lines.length) {
          clearInterval(timer);
          return v;
        }
        return v + 1;
      });
    }, 700);
    return () => clearInterval(timer);
  }, [poem]);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(poem)}&url=https://poetcam.vercel.app&hashtags=PoetCam,AIpoetry`;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center">
        {lines.map((line, idx) => (
          <p
            key={idx}
            className={`transition-opacity duration-700 text-center text-2xl md:text-3xl font-serif italic tracking-wide whitespace-pre-wrap ${
              visible > idx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {line}
          </p>
        ))}
      </div>
      {visible >= lines.length && (
        <div className="flex gap-4">
          <button
            onClick={() => navigator.clipboard.writeText(poem)}
            className="bg-white text-black px-4 py-2 rounded-full shadow"
          >
            시 복사하기
          </button>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-full shadow"
          >
            X(트위터)에 공유
          </a>
        </div>
      )}
    </div>
  );
}
