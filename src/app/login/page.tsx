"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const step = sessionStorage.getItem("flowStep");
    if (step !== "login") {
      router.replace("/");
    }
  }, [router]);

  const handleLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("flowStep", "permission");
    router.replace("/permission");
  };

  return (
    <main className="flex flex-col items-center justify-center gap-4 min-h-screen bg-black text-white p-4">
      <h1 className="text-xl mb-2">로그인</h1>
      <button
        onClick={() => handleLogin("kakao")}
        className="bg-yellow-400 text-black px-6 py-2 rounded-full w-40"
      >
        카카오 로그인
      </button>
      <button
        onClick={() => handleLogin("naver")}
        className="bg-green-600 text-white px-6 py-2 rounded-full w-40"
      >
        네이버 로그인
      </button>
      <button
        onClick={() => handleLogin("google")}
        className="bg-white text-black px-6 py-2 rounded-full w-40"
      >
        구글 로그인
      </button>
    </main>
  );
}
