"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Share2, Download, Crown, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ResultPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const poem = {
    title: "노을이 지는 순간",
    lines: [
      "하늘이 붉게 물들어가는 시간",
      "당신의 미소가 그 안에 번진다",
      "오늘도 이렇게 흘러가지만",
      "이 순간만큼은 영원하길",
      "— 그리고 내일도 함께하길",
    ],
    image: "/placeholder.svg?height=400&width=300",
    mood: "로맨틱",
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
  };

  const templates = [
    { id: 1, name: "필름 감성", preview: "/placeholder.svg?height=100&width=80", premium: false },
    { id: 2, name: "빈티지 노트", preview: "/placeholder.svg?height=100&width=80", premium: true },
    { id: 3, name: "엽서 스타일", preview: "/placeholder.svg?height=100&width=80", premium: true },
    { id: 4, name: "모던 미니멀", preview: "/placeholder.svg?height=100&width=80", premium: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-purple-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 pt-12">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-gray-800">당신의 시</h1>
        <Button variant="ghost" size="icon">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        {/* Poem Card */}
        <Card className="mb-6 overflow-hidden border-0 shadow-xl bg-white">
          {/* Image */}
          <div className="relative">
            <img
              src={poem.image || "/placeholder.svg"}
              alt="시 이미지"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Poem Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-xl font-bold mb-3">{poem.title}</h2>
              <div className="space-y-1">
                {poem.lines.map((line, index) => (
                  <p key={index} className="text-sm leading-relaxed opacity-90">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`${isLiked ? "text-red-500" : "text-gray-500"}`}>
                  <Heart className={`w-5 h-5 mr-1 ${isLiked ? "fill-current" : ""}`} />
                  {isLiked ? "좋아요" : "마음에 들어요"}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <MessageCircle className="w-5 h-5 mr-1" />
                  피드백
                </Button>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500">분위기:</span>
                <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full">
                  {poem.mood}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-gray-200 hover:bg-gray-50 bg-transparent"
                onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                다시 생성
              </Button>
              <Button
                className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white"
                onClick={() => setShowTemplates(true)}>
                <Download className="w-4 h-4 mr-2" />
                저장하기
              </Button>
            </div>
          </div>
        </Card>

        {/* Template Selection */}
        {showTemplates && (
          <Card className="p-4 border-0 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-4">디자인 템플릿 선택</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {templates.map((template) => (
                <div key={template.id} className="relative">
                  <Card
                    className={`p-3 text-center cursor-pointer transition-all hover:shadow-md ${
                      template.premium ? "opacity-75" : ""
                    }`}>
                    <img
                      src={template.preview || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full h-20 object-cover rounded mb-2"
                    />
                    <p className="text-xs font-medium text-gray-700">{template.name}</p>
                    {template.premium && (
                      <div className="absolute top-2 right-2">
                        <Crown className="w-4 h-4 text-yellow-500" />
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>

            {/* Premium Notice */}
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-3 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-purple-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-800">프리미엄 템플릿</p>
                  <p className="text-xs text-purple-600">더 많은 디자인과 고화질 저장</p>
                </div>
                <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                  업그레이드
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Fun Fact */}
        <Card className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">💡 재미있는 사실</p>
            <p className="text-xs text-gray-500">
              이 시는 AI가 당신의 사진에서 느낀 감정을 바탕으로 3.7초 만에 완성되었어요!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
