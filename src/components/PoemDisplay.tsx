'use client';

interface Props {
  poem: string;
}

export default function PoemDisplay({ poem }: Props) {
  return (
    <div className="fade-in text-center whitespace-pre-line text-xl leading-relaxed">
      {poem}
    </div>
  );
}
