// src/config/gemAI.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-2.5-flash";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // ✅ Environment variable

async function runChat(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const chat = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return "Error fetching response from Gemini API.";
  }
}

export default runChat;