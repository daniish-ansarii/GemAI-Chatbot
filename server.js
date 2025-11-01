// server.js
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyDrxD4kmJcjj9izrMw08z4KUgvmZU32AbA"); // your API key
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));