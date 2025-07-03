"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, ImageIcon, BookOpen, Settings, Sparkles, Crown } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [recentPoems] = useState([
    { id: 1, image: "/placeholder.svg?height=100&width=100", preview: "노을이 지는 하늘에\n당신의 미소가 번진다..." },
    { id: 2, image: "/placeholder.svg?height=100&width=100", preview: "커피 한 잔의 여유\n오늘도 흘러간다..." },
    { id: 3, image: "/placeholder.svg?height=100&width=100", preview: "비 내리는 창가에서\n그리움이 자란다..." },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-rose-50 to-amber-50">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pt-12">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Poetcam</h1>
          <p className="text-sm text-gray-500">감성을 담는 카메라</p>
        </div>
        <div className="flex space-x-2">
          <Link href="/collection">
            <Button variant="ghost" size="icon" className="rounded-full">
              <BookOpen className="w-5 h-5 text-gray-600" />
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="mb-6">
            <Sparkles className="w-12 h-12 text-rose-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">📸 지금 감성을 찍어보세요</h2>
            <p className="text-gray-600">당신의 순간이 아름다운 시가 됩니다</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/camera">
            <Card className="p-6 bg-gradient-to-r from-rose-400 to-pink-500 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center space-x-4 text-white">
                <Camera className="w-8 h-8" />
                <div className="text-center">
                  <h3 className="text-xl font-bold">카메라로 촬영하기</h3>
                  <p className="text-rose-100">새로운 순간을 포착해보세요</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/upload">
            <Card className="p-6 bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center space-x-4 text-gray-700">
                <ImageIcon className="w-8 h-8 text-purple-400" />
                <div className="text-center">
                  <h3 className="text-xl font-bold">갤러리에서 가져오기</h3>
                  <p className="text-gray-500">저장된 사진으로 시 만들기</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Premium Banner */}
        <Card className="p-4 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200">
          <div className="flex items-center space-x-3">
            <Crown className="w-6 h-6 text-purple-500" />
            <div className="flex-1">
              <h4 className="font-semibold text-purple-800">프리미엄으로 업그레이드</h4>
              <p className="text-sm text-purple-600">무제한 시 생성 + 고급 템플릿</p>
            </div>
            <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
              업그레이드
            </Button>
          </div>
        </Card>

        {/* Recent Poems */}
        {recentPoems.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">최근 만든 시</h3>
            <div className="space-y-3">
              {recentPoems.map((poem) => (
                <Card key={poem.id} className="p-4 bg-white border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex space-x-4">
                    <img
                      src={poem.image || "/placeholder.svg"}
                      alt="시 이미지"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{poem.preview}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Link href="/collection">
              <Button variant="outline" className="w-full mt-4 border-gray-200 bg-transparent">
                모든 시 보기
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Spacing */}
      <div className="h-20" />
    </div>
  )
}
