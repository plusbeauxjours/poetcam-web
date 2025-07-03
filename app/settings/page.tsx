"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Crown, Bell, Palette, Shield, HelpCircle, Star, LogOut } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const subscriptionInfo = {
    plan: "무료",
    credits: 3,
    maxCredits: 5,
    nextReset: "2024.01.20",
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
        <h1 className="text-lg font-semibold text-gray-800">설정</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 space-y-6">
        {/* Subscription Status */}
        <Card className="p-4 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200">
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="w-6 h-6 text-purple-500" />
            <div className="flex-1">
              <h3 className="font-semibold text-purple-800">구독 현황</h3>
              <p className="text-sm text-purple-600">{subscriptionInfo.plan} 플랜</p>
            </div>
            <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
              업그레이드
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-700">
                {subscriptionInfo.credits}/{subscriptionInfo.maxCredits}
              </p>
              <p className="text-xs text-purple-600">남은 크레딧</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-purple-700">{subscriptionInfo.nextReset}</p>
              <p className="text-xs text-purple-600">다음 충전일</p>
            </div>
          </div>
        </Card>

        {/* Premium Features */}
        <Card className="p-4 border-0 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-4">프리미엄 혜택</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">무제한 시 생성</p>
                  <p className="text-sm text-gray-500">크레딧 제한 없이 자유롭게</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                업그레이드
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Palette className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">프리미엄 템플릿</p>
                  <p className="text-sm text-gray-500">50+ 고급 디자인 템플릿</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                업그레이드
              </Button>
            </div>
          </div>
        </Card>

        {/* App Settings */}
        <Card className="p-4 border-0 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-4">앱 설정</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">알림</p>
                  <p className="text-sm text-gray-500">새로운 기능 및 업데이트</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">다크 모드</p>
                  <p className="text-sm text-gray-500">어두운 테마 사용</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">자동 저장</p>
                  <p className="text-sm text-gray-500">시를 자동으로 저장</p>
                </div>
              </div>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
          </div>
        </Card>

        {/* Support */}
        <Card className="p-4 border-0 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-4">지원</h3>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start p-3 h-auto">
              <HelpCircle className="w-5 h-5 mr-3 text-gray-600" />
              <div className="text-left">
                <p className="font-medium text-gray-800">도움말</p>
                <p className="text-sm text-gray-500">사용법 및 FAQ</p>
              </div>
            </Button>

            <Button variant="ghost" className="w-full justify-start p-3 h-auto">
              <Star className="w-5 h-5 mr-3 text-gray-600" />
              <div className="text-left">
                <p className="font-medium text-gray-800">앱 평가하기</p>
                <p className="text-sm text-gray-500">앱스토어에서 별점 남기기</p>
              </div>
            </Button>
          </div>
        </Card>

        {/* Account */}
        <Card className="p-4 border-0 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-4">계정</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">로그인 정보</p>
              <p className="font-medium text-gray-800">user@example.com</p>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start p-3 h-auto text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-5 h-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">로그아웃</p>
                <p className="text-sm opacity-75">계정에서 로그아웃</p>
              </div>
            </Button>
          </div>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 pb-8">
          <p>Poetcam v1.0.0</p>
          <p>© 2024 Poetcam. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
