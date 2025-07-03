"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Feather, Sparkles, Heart, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

const loadingMessages = [
  "당신의 순간을 시로 옮기는 중입니다...",
  "이미지의 감정을 분석하고 있어요...",
  "아름다운 은유를 찾고 있습니다...",
  "감성적인 표현을 다듬는 중이에요...",
  "마지막 터치를 더하고 있습니다...",
]

const floatingIcons = [
  { icon: Feather, delay: 0, color: "text-rose-400" },
  { icon: Sparkles, delay: 1000, color: "text-purple-400" },
  { icon: Heart, delay: 2000, color: "text-pink-400" },
  { icon: BookOpen, delay: 3000, color: "text-blue-400" },
]

export default function LoadingPage() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => router.push("/result"), 500)
          return 100
        }
        return prev + 2
      })
    }, 100)

    // Message rotation
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      {/* Floating Animation Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className={`absolute animate-bounce ${item.color}`}
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + index * 15}%`,
              animationDelay: `${item.delay}ms`,
              animationDuration: "3s",
            }}
          >
            <item.icon className="w-8 h-8 opacity-30" />
          </div>
        ))}
      </div>

      {/* Main Loading Card */}
      <Card className="w-full max-w-sm p-8 text-center bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        {/* Animated Feather */}
        <div className="mb-8 relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-rose-100 to-purple-100 rounded-full flex items-center justify-center">
            <Feather className="w-10 h-10 text-rose-400 animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-ping opacity-75" />
        </div>

        {/* Loading Message */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">AI가 시를 쓰고 있어요</h2>
          <p className="text-gray-600 leading-relaxed min-h-[3rem] flex items-center justify-center">
            {loadingMessages[currentMessage]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{progress}%</p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-rose-300 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </Card>

      {/* Bottom Text */}
      <p className="mt-8 text-sm text-gray-500 text-center max-w-xs">
        잠시만 기다려주세요. 당신만의 특별한 시가 곧 완성됩니다.
      </p>
    </div>
  )
}
