"use client";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  const handleStart = () => {
    sessionStorage.setItem("flowStep", "login");
    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center justify-center gap-6 min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold">포엣캠</h1>
      <p>AI가 당신의 사진을 시로 만들어드립니다.</p>
      <button
        onClick={handleStart}
        className="bg-white text-black px-6 py-2 rounded-full"
      >
        시작하기
      </button>
    </main>
  );
}
