import { PoemStructuredData } from "@/types";

/**
 * SEO 관련 유틸리티 함수들
 */

/**
 * 시에 대한 구조화된 데이터를 생성합니다
 */
export function createPoemStructuredData(poem: string): PoemStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "AI 생성 시",
    text: poem,
    author: {
      "@type": "SoftwareApplication",
      name: "포엣캠 AI",
    },
    dateCreated: new Date().toISOString(),
    genre: "시",
    inLanguage: "ko",
    creativeWorkStatus: "Published",
  };
}

/**
 * 구조화된 데이터를 DOM에 추가합니다
 */
export function addStructuredDataToDOM(data: PoemStructuredData): void {
  // 기존 구조화된 데이터 제거
  const existingScript = document.querySelector("script[data-poem-structured-data]");
  if (existingScript) {
    existingScript.remove();
  }

  // 새 구조화된 데이터 추가
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-poem-structured-data", "true");
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * 구조화된 데이터를 DOM에서 제거합니다
 */
export function removeStructuredDataFromDOM(): void {
  const existingScript = document.querySelector("script[data-poem-structured-data]");
  if (existingScript) {
    existingScript.remove();
  }
}
