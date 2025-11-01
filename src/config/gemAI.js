// src/config/gemAI.js

async function runChat(prompt) {
  try {
    const response = await fetch("https://your-vercel-app-name.vercel.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return data.response || "No response received.";
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return "Error fetching response from Gemini API.";
  }
}

export default runChat;