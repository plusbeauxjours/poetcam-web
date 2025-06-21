import { SHARE_CONFIG, APP_CONFIG } from "@/constants";

/**
 * 공유 관련 유틸리티 함수들
 */

/**
 * 트위터 공유 URL을 생성합니다
 */
export function createTwitterShareUrl(poem: string): string {
  const shareText = `${poem}\n\n${SHARE_CONFIG.hashtags.map((tag) => `#${tag}`).join(" ")}`;

  const params = new URLSearchParams({
    text: shareText,
    url: APP_CONFIG.url,
  });

  return `${SHARE_CONFIG.twitterBaseUrl}?${params.toString()}`;
}

/**
 * 페이스북 공유 URL을 생성합니다
 */
export function createFacebookShareUrl(poem: string): string {
  const shareText = `${poem}\n\n${SHARE_CONFIG.hashtags.map((tag) => `#${tag}`).join(" ")}`;

  const params = new URLSearchParams({
    u: APP_CONFIG.url,
    quote: shareText,
  });

  return `${SHARE_CONFIG.facebookBaseUrl}?${params.toString()}`;
}

/**
 * Web Share API를 사용하여 공유합니다
 */
export async function shareViaWebAPI(poem: string, imageDataUrl?: string): Promise<void> {
  if (!navigator.share) return;

  const shareText = `${poem}\n\n${SHARE_CONFIG.hashtags.map((tag) => `#${tag}`).join(" ")}`;

  const files: File[] = [];
  if (imageDataUrl) {
    try {
      const res = await fetch(imageDataUrl);
      const blob = await res.blob();
      files.push(new File([blob], "poetcam.jpg", { type: blob.type }));
    } catch (error) {
      console.error("Failed to process image for sharing:", error);
    }
  }

  try {
    await navigator.share({
      title: APP_CONFIG.name,
      text: shareText,
      url: APP_CONFIG.url,
      files,
    });
  } catch (error) {
    console.error("Failed to share:", error);
  }
}

/**
 * 클립보드에 텍스트를 복사합니다
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

/**
 * 버튼 피드백을 제공합니다 (텍스트 임시 변경)
 */
export function showButtonFeedback(
  button: HTMLButtonElement,
  feedbackText: string,
  duration: number = 2000
): void {
  const originalText = button.textContent;
  button.textContent = feedbackText;

  setTimeout(() => {
    button.textContent = originalText;
  }, duration);
}
