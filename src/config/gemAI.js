async function runChat(prompt) {
  try {
    const response = await fetch("http://127.0.0.1:5001/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "API request failed");
    }

    return data.response;
  } catch (error) {
    console.error("Chat API Error:", error);
    throw error;
  }
}

export default runChat;
