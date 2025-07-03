"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, RotateCcw, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CameraPage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleCapture = () => {
    setIsCapturing(true);
    // 실제 카메라 기능 시뮬레이션
    setTimeout(() => {
      setCapturedImage("/placeholder.svg?height=400&width=300");
      setIsCapturing(false);
    }, 1000);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePoem = () => {
    router.push("/loading");
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 pt-12 text-white">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">감성 촬영</h1>
        <div className="w-10" />
      </div>

      {/* Camera View */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {!capturedImage ? (
          <div className="relative w-full max-w-sm aspect-[3/4] bg-gray-900 rounded-2xl overflow-hidden border-4 border-gray-700">
            {/* Camera Preview Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              {isCapturing ? (
                <div className="text-center text-white">
                  <div className="animate-pulse mb-4">
                    <Camera className="w-16 h-16 mx-auto text-rose-400" />
                  </div>
                  <p className="text-sm">촬영 중...</p>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Camera className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-sm">카메라 뷰</p>
                </div>
              )}
            </div>

            {/* Overlay Grid */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-white/20" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Card className="w-full max-w-sm aspect-[3/4] overflow-hidden border-0 shadow-2xl">
            <img
              src={capturedImage || "/placeholder.svg"}
              alt="촬영된 사진"
              className="w-full h-full object-cover"
            />
          </Card>
        )}

        {/* Capture Instructions */}
        {!capturedImage && !isCapturing && (
          <div className="mt-8 text-center text-white/80">
            <p className="text-sm mb-2">감성적인 순간을 포착해보세요</p>
            <p className="text-xs text-white/60">사진이 아름다운 시로 변환됩니다</p>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="p-6 pb-8">
        {!capturedImage ? (
          <div className="flex items-center justify-center space-x-8">
            {/* Gallery Button */}
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/30"
              onClick={() => fileInputRef.current?.click()}>
              <div className="w-6 h-6 bg-white/60 rounded border-2 border-white" />
            </Button>

            {/* Capture Button */}
            <Button
              onClick={handleCapture}
              disabled={isCapturing}
              className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 shadow-lg disabled:opacity-50">
              <div className="w-16 h-16 rounded-full border-4 border-gray-300 bg-white" />
            </Button>

            {/* Flash Button */}
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/30">
              <Zap className="w-6 h-6" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              onClick={handleGeneratePoem}
              className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white py-4 text-lg font-medium rounded-2xl shadow-lg">
              ✨ 시 생성하기
            </Button>
            <Button
              onClick={retakePhoto}
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10 py-3 rounded-2xl bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              다시 촬영하기
            </Button>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
