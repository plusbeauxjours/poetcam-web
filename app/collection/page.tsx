"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Filter, Grid3X3, List, Download, Crown } from "lucide-react";
import Link from "next/link";

export default function CollectionPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const poems = [
    {
      id: 1,
      title: "노을이 지는 순간",
      preview: "하늘이 붉게 물들어가는 시간\n당신의 미소가 그 안에 번진다...",
      image: "/placeholder.svg?height=200&width=150",
      date: "2024.01.15",
      mood: "로맨틱",
      likes: 12,
    },
    {
      id: 2,
      title: "커피 한 잔의 여유",
      preview: "아침 햇살이 창가로 스며들고\n따뜻한 커피 향이 마음을 깨운다...",
      image: "/placeholder.svg?height=200&width=150",
      date: "2024.01.14",
      mood: "평온",
      likes: 8,
    },
    {
      id: 3,
      title: "비 내리는 오후",
      preview: "창밖으로 떨어지는 빗방울들\n그리움이 조용히 자라난다...",
      image: "/placeholder.svg?height=200&width=150",
      date: "2024.01.13",
      mood: "감성",
      likes: 15,
    },
    {
      id: 4,
      title: "도시의 밤",
      preview: "네온사인이 밤을 밝히고\n수많은 이야기들이 흘러간다...",
      image: "/placeholder.svg?height=200&width=150",
      date: "2024.01.12",
      mood: "도시적",
      likes: 6,
    },
    {
      id: 5,
      title: "봄날의 산책",
      preview: "벚꽃이 흩날리는 길 위에서\n새로운 시작을 꿈꾸어본다...",
      image: "/placeholder.svg?height=200&width=150",
      date: "2024.01.11",
      mood: "희망적",
      likes: 20,
    },
    {
      id: 6,
      title: "고양이와의 오후",
      preview: "햇살 아래 잠든 고양이처럼\n평화로운 시간이 흘러간다...",
      image: "/placeholder.svg?height=200&width=150",
      date: "2024.01.10",
      mood: "평온",
      likes: 11,
    },
  ];

  const filteredPoems = poems.filter(
    (poem) =>
      poem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poem.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const moodColors = {
    로맨틱: "bg-rose-100 text-rose-600",
    평온: "bg-blue-100 text-blue-600",
    감성: "bg-purple-100 text-purple-600",
    도시적: "bg-gray-100 text-gray-600",
    희망적: "bg-green-100 text-green-600",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-purple-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 pt-12">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-gray-800">나의 시집</h1>
        <Button variant="ghost" size="icon">
          <Download className="w-5 h-5" />
        </Button>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <Card className="p-4 bg-white border-0 shadow-md">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{poems.length}</p>
              <p className="text-sm text-gray-500">작성한 시</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-rose-500">
                {poems.reduce((sum, poem) => sum + poem.likes, 0)}
              </p>
              <p className="text-sm text-gray-500">받은 좋아요</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-500">7</p>
              <p className="text-sm text-gray-500">연속 작성일</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="px-6 mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="시 제목이나 내용으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200 bg-white"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-gray-200 bg-transparent">
              <Filter className="w-4 h-4 mr-1" />
              필터
            </Button>
          </div>
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0">
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8 p-0">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Poems Grid/List */}
      <div className="px-6 pb-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredPoems.map((poem) => (
              <Card
                key={poem.id}
                className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img
                    src={poem.image || "/placeholder.svg"}
                    alt={poem.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        moodColors[poem.mood as keyof typeof moodColors]
                      }`}>
                      {poem.mood}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-800 mb-1 truncate">
                    {poem.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">{poem.preview}</p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{poem.date}</span>
                    <span>❤️ {poem.likes}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPoems.map((poem) => (
              <Card
                key={poem.id}
                className="p-4 border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex space-x-4">
                  <img
                    src={poem.image || "/placeholder.svg"}
                    alt={poem.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">{poem.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2 ${
                          moodColors[poem.mood as keyof typeof moodColors]
                        }`}>
                        {poem.mood}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{poem.preview}</p>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>{poem.date}</span>
                      <span>❤️ {poem.likes}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Export Options */}
      <div className="px-6 pb-8">
        <Card className="p-4 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200">
          <div className="flex items-center space-x-3">
            <Crown className="w-6 h-6 text-purple-500" />
            <div className="flex-1">
              <h4 className="font-semibold text-purple-800">시집 PDF로 내보내기</h4>
              <p className="text-sm text-purple-600">나만의 시집을 아름다운 PDF로 저장하세요</p>
            </div>
            <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
              내보내기
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
