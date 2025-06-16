import { GeneratePoemResponse } from "@/types";
import { ERROR_MESSAGES } from "@/constants";

/**
 * 이미지를 기반으로 시를 생성하는 API 호출 함수
 */
export async function generatePoem(image: string): Promise<string> {
  try {
    const response = await fetch("/api/generate-poem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(ERROR_MESSAGES.api.poemGenerationFailed);
    }

    const data: GeneratePoemResponse = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.poem) {
      throw new Error(ERROR_MESSAGES.api.poemGenerationFailed);
    }

    return data.poem;
  } catch (error) {
    console.error("Generate poem error:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(ERROR_MESSAGES.api.serverError);
  }
}
