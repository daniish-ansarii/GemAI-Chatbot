import React, { createContext, useState } from "react";
import runChat from "../config/gemAI";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Typing effect
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  // New chat function
  const newChat = () => {
    setInput("");
    setResultData("");
    setShowResult(false);
    setLoading(false);
    setRecentPrompt("");
  };

  // Send prompt to Gemini API
  const onSent = async (prompt) => {
    const message = (prompt ?? input).trim();

    if (!message || loading) return;

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(message);

    if (prompt === undefined) {
      setPrevPrompts((prev) => [...prev, message]);
    }

    try {
      // Get response from backend
      const response = await runChat(message);

      if (!response) {
        throw new Error("Empty response received from Gemini API");
      }

      // Format response
      const responseArray = response.split("**");
      let formattedResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 0) {
          formattedResponse += responseArray[i];
        } else {
          formattedResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      formattedResponse = formattedResponse
        .replace(/\n/g, "<br/>")
        .replace(/\*/g, "");

      // Typing effect
      const words = formattedResponse.split(" ");

      words.forEach((word, index) => {
        delayPara(index, word + " ");
      });
    } catch (error) {
      console.error("Chat Error:", error);

      setResultData("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
