
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME, API_KEY } from '../constants';

function getGoogleGenAIInstance(): GoogleGenAI {
  if (!API_KEY) {
    // This error indicates a build/environment configuration problem.
    // The API_KEY should be injected by the build process (e.g. Vite's import.meta.env.VITE_API_KEY)
    // and aliased or available as process.env.API_KEY.
    throw new Error("API_KEY is not configured. Please ensure the environment variable (e.g., VITE_API_KEY) is set during the build process and made available as process.env.API_KEY.");
  }
  return new GoogleGenAI({ apiKey: API_KEY });
}

export async function optimizePromptWithGemini(rawPrompt: string): Promise<string> {
  const ai = getGoogleGenAIInstance();

  const instruction = `You are an AI assistant specialized in prompt engineering. Your task is to optimize the following user-provided 'raw prompt'. The goal is to transform the raw prompt into a version that is clearer, more concise, contextually rich, and highly effective for eliciting desired responses from large language models. The optimized prompt must be in English and structured as a single, clean, professional paragraph. Return ONLY the optimized prompt. Do not include any introductory phrases, explanations, apologies, or any text other than the refined prompt itself. If the prompt is used to produce the image, then optimize the light, shooting style and image sharpness level. Ensure the output is ready for direct use. Raw prompt: "${rawPrompt}"`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: instruction,
    });
    
    const optimizedText = response.text;

    if (!optimizedText || optimizedText.trim() === '') {
        throw new Error("The API returned an empty or invalid optimization. Please try rephrasing your prompt or try again later.");
    }
    return optimizedText.trim();
  } catch (error) {
    console.error("Error optimizing prompt with Gemini:", error);
    if (error instanceof Error) {
        // Check for common API related errors if possible, otherwise pass generic message.
        if (error.message.includes("API key not valid")) {
             throw new Error("Invalid API Key. Please check your configuration.");
        }
        throw new Error(`Failed to optimize prompt: ${error.message}. Please check your network connection and API key.`);
    }
    throw new Error("Failed to optimize prompt due to an unknown API error.");
  }
}
