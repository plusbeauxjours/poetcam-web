"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, ImageIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setSelectedImages((prev) => [...prev, result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGeneratePoem = () => {
    if (selectedImages.length > 0) {
      router.push("/loading");
    }
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
        <h1 className="text-lg font-semibold text-gray-800">사진 업로드</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 space-y-6">
        {/* Upload Area */}
        <Card
          className={`p-8 border-2 border-dashed transition-all duration-300 cursor-pointer ${
            isDragging
              ? "border-rose-400 bg-rose-50"
              : selectedImages.length > 0
              ? "border-green-300 bg-green-50"
              : "border-gray-300 bg-white hover:border-rose-300 hover:bg-rose-50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}>
          <div className="text-center">
            {selectedImages.length === 0 ? (
              <>
                <div className="mb-4">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">사진을 업로드하세요</h3>
                <p className="text-gray-600 mb-4">드래그 앤 드롭하거나 클릭해서 선택하세요</p>
                <p className="text-sm text-gray-500">JPG, PNG, HEIC 파일 지원 (최대 10MB)</p>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <ImageIcon className="w-16 h-16 text-green-500 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {selectedImages.length}장의 사진이 선택되었습니다
                </h3>
                <p className="text-green-600">더 추가하거나 시 생성을 시작하세요</p>
              </>
            )}
          </div>
        </Card>

        {/* Selected Images */}
        {selectedImages.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">선택된 사진</h3>
            <div className="grid grid-cols-2 gap-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <Card className="overflow-hidden border-0 shadow-md">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`선택된 사진 ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </Card>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                    onClick={() => removeImage(index)}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <Card className="p-4 bg-blue-50 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">💡 더 좋은 시를 위한 팁</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 감정이 잘 드러나는 순간을 담은 사진이 좋아요</li>
            <li>• 자연, 사람, 일상의 소소한 장면들이 시가 되기 쉬워요</li>
            <li>• 밝기와 대비가 적절한 사진일수록 더 정확해요</li>
          </ul>
        </Card>

        {/* Generate Button */}
        {selectedImages.length > 0 && (
          <Button
            onClick={handleGeneratePoem}
            className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white py-4 text-lg font-medium rounded-2xl shadow-lg">
            ✨ 시 생성하기 ({selectedImages.length}장)
          </Button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Bottom Spacing */}
      <div className="h-20" />
    </div>
  );
}
