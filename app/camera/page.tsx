"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, RotateCcw, ArrowLeft, Zap, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CameraError = "permission-denied" | "no-camera" | "unknown" | null;
type CameraState = "idle" | "requesting" | "active" | "capturing" | "error";

export default function CameraPage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>("idle");
  const [cameraError, setCameraError] = useState<CameraError>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraState("idle");
  };

  const checkCameraDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === "videoinput");
      setHasMultipleCameras(videoDevices.length > 1);
    } catch (error) {
      console.error("Error checking camera devices:", error);
    }
  };

  const startCamera = async () => {
    setCameraState("requesting");
    setCameraError(null);

    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera not supported");
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        const video = videoRef.current;

        // Set up event listeners before setting the stream
        const handleLoadedMetadata = () => {
          setCameraState("active");
          cleanup();
        };

        const handleVideoError = () => {
          console.error("Video loading error");
          setCameraState("error");
          setCameraError("unknown");
          cleanup();
        };

        const cleanup = () => {
          video.removeEventListener("loadedmetadata", handleLoadedMetadata);
          video.removeEventListener("error", handleVideoError);
          if (timeoutId) clearTimeout(timeoutId);
        };

        // Set timeout to handle cases where video never loads
        const timeoutId = setTimeout(() => {
          console.warn("Video loading timeout");
          setCameraState("error");
          setCameraError("unknown");
          cleanup();
        }, 10000); // 10 second timeout

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("error", handleVideoError);

        // Set the stream
        video.srcObject = stream;
        streamRef.current = stream;

        // Check for multiple cameras after getting permission
        await checkCameraDevices();
      }
    } catch (error: any) {
      console.error("Error accessing camera:", error);
      setCameraState("error");

      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setCameraError("permission-denied");
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        setCameraError("no-camera");
      } else {
        setCameraError("unknown");
      }
    }
  };

  const switchCamera = async () => {
    if (cameraState === "active") {
      stopCamera();
      setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
      // Start camera with proper state management
      setTimeout(() => startCamera(), 100);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || cameraState !== "active") return;

    setCameraState("capturing");

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Apply flash effect
    if (flashEnabled) {
      const flashDiv = document.createElement("div");
      flashDiv.style.position = "fixed";
      flashDiv.style.top = "0";
      flashDiv.style.left = "0";
      flashDiv.style.width = "100%";
      flashDiv.style.height = "100%";
      flashDiv.style.backgroundColor = "white";
      flashDiv.style.zIndex = "9999";
      flashDiv.style.opacity = "0.8";
      document.body.appendChild(flashDiv);

      setTimeout(() => {
        document.body.removeChild(flashDiv);
      }, 150);
    }

    // Draw video frame to canvas
    context.drawImage(video, 0, 0);

    // Convert to data URL
    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(imageDataUrl);

    // Stop camera after capture
    stopCamera();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePoem = () => {
    router.push("/loading");
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setCameraState("idle");
  };

  const requestPermissionAgain = () => {
    setCameraError(null);
    startCamera();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const renderCameraError = () => {
    if (cameraError === "permission-denied") {
      return (
        <div className="text-center text-white p-8">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h3 className="text-lg font-semibold mb-2">카메라 권한이 필요합니다</h3>
          <p className="text-sm text-white/80 mb-6">
            사진 촬영을 위해 카메라 접근 권한을 허용해주세요. 브라우저 설정에서 카메라 권한을
            확인해보세요.
          </p>
          <Button
            onClick={requestPermissionAgain}
            className="bg-rose-500 hover:bg-rose-600 text-white">
            다시 시도
          </Button>
        </div>
      );
    }

    if (cameraError === "no-camera") {
      return (
        <div className="text-center text-white p-8">
          <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">카메라를 찾을 수 없습니다</h3>
          <p className="text-sm text-white/80 mb-6">카메라가 연결되어 있는지 확인해주세요.</p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-rose-500 hover:bg-rose-600 text-white">
            갤러리에서 선택
          </Button>
        </div>
      );
    }

    return (
      <div className="text-center text-white p-8">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
        <h3 className="text-lg font-semibold mb-2">카메라 오류</h3>
        <p className="text-sm text-white/80 mb-6">
          카메라를 시작할 수 없습니다. 다시 시도해주세요.
        </p>
        <Button
          onClick={requestPermissionAgain}
          className="bg-rose-500 hover:bg-rose-600 text-white">
          다시 시도
        </Button>
      </div>
    );
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
            {/* {cameraState === "error" ? (
              renderCameraError()
            ) : cameraState === "requesting" ? (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="animate-spin mb-4">
                    <RefreshCw className="w-16 h-16 mx-auto text-rose-400" />
                  </div>
                  <p className="text-sm">카메라 권한 요청 중...</p>
                </div>
              </div>
            ) : cameraState === "capturing" ? (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="animate-pulse mb-4">
                    <Camera className="w-16 h-16 mx-auto text-rose-400" />
                  </div>
                  <p className="text-sm">촬영 중...</p>
                </div>
              </div>
            ) : cameraState === "active" ? ( */}
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Top Camera Controls Overlay */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
                <div className="flex justify-between items-center">
                  {/* Flash Indicator */}
                  {flashEnabled && (
                    <div className="flex items-center space-x-1 bg-yellow-500/80 px-2 py-1 rounded-full">
                      <Zap className="w-3 h-3 text-white" />
                      <span className="text-xs text-white font-medium">Flash</span>
                    </div>
                  )}

                  {!flashEnabled && <div />}

                  {/* Camera Switch Button */}
                  {hasMultipleCameras && (
                    <Button
                      onClick={switchCamera}
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm border border-white/20">
                      <RefreshCw className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border border-white/30" />
                  ))}
                </div>
              </div>

              {/* Bottom Camera Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                <div className="flex justify-center items-center space-x-4">
                  {/* Camera Status Indicator */}
                  <div className="flex items-center space-x-2 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white font-medium">
                      {facingMode === "user" ? "전면" : "후면"} 카메라
                    </span>
                  </div>
                </div>
              </div>

              {/* Focus Point Indicator (could be added for focus tap functionality) */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Center focus indicator */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 border-2 border-white/40 rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/60 rounded-full" />
                </div>
              </div>
            </>
            {/* ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm mb-4">
                    카메라를 시작하려면
                    <br />
                    촬영 버튼을 눌러주세요
                  </p>
                  <Button
                    onClick={startCamera}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full">
                    카메라 시작
                  </Button>
                </div>
              </div>
            )} */}
          </div>
        ) : (
          <Card className="w-full max-w-sm aspect-[3/4] overflow-hidden border-0 shadow-2xl">
            <img src={capturedImage} alt="촬영된 사진" className="w-full h-full object-cover" />
          </Card>
        )}

        {/* Capture Instructions */}
        {!capturedImage && cameraState === "active" && (
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
              onClick={cameraState === "active" ? capturePhoto : startCamera}
              disabled={cameraState === "requesting" || cameraState === "capturing"}
              className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 shadow-lg disabled:opacity-50">
              <div className="w-16 h-16 rounded-full border-4 border-gray-300 bg-white" />
            </Button>

            {/* Flash Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`w-12 h-12 rounded-full text-white hover:bg-white/30 ${
                flashEnabled ? "bg-yellow-500/50" : "bg-white/20"
              }`}
              onClick={() => setFlashEnabled(!flashEnabled)}>
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

      {/* Hidden Elements */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
