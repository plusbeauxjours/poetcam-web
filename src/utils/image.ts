/**
 * 이미지 처리 관련 유틸리티 함수들
 */

/**
 * Data URL에서 base64 데이터를 추출합니다
 */
export function extractBase64FromDataUrl(dataUrl: string): string {
  return dataUrl.replace(/^data:image\/[^;]+;base64,/, "").replace(/\s/g, "");
}

/**
 * Data URL에서 이미지 포맷을 감지합니다
 */
export function detectImageFormat(dataUrl: string): string {
  const match = dataUrl.match(/^data:image\/([^;]+)/);
  return match?.[1] || "jpeg";
}

/**
 * 이미지 포맷에 따른 미디어 타입을 반환합니다
 */
export function getMediaType(format: string): string {
  return format === "png" ? "image/png" : "image/jpeg";
}

/**
 * base64 문자열이 유효한지 검증합니다
 */
export function isValidBase64(base64: string): boolean {
  return /^[A-Za-z0-9+/=]+$/.test(base64);
}

/**
 * base64 데이터가 충분한 크기인지 검증합니다
 */
export function hasMinimumSize(base64: string, minSize: number = 100): boolean {
  return base64.length >= minSize;
}

/**
 * 이미지를 canvas로 변환하여 base64 데이터를 생성합니다
 */
export function imageToBase64(imageSrc: string, quality: number = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(dataUrl);
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}

/**
 * 캡처된 비디오 프레임을 base64로 변환합니다
 */
export function captureVideoFrame(video: HTMLVideoElement, quality: number = 0.8): string | null {
  if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}
