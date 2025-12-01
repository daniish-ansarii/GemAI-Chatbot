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
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  // NEW CHAT FUNCTION (fixed)
  const newChat = () => {
    setInput("");            // clear input
    setResultData("");       // clear result window
    setShowResult(false);    // hide old result
    setLoading(false);       // stop loader
    setRecentPrompt("");     // clear last prompt
    // NOTE: we DO NOT clear prevPrompts (your recent history)
    // If you want to clear it also, uncomment:
    // setPrevPrompts([]);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;

    // If clicked from history
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    }
    // If user typed manually
    else {
      setPrevPrompts((prev) => [...prev, input]);
      response = await runChat(input);
      setRecentPrompt(input);
    }

    if (!response) {
      console.error("No response received from Gemini API");
      setResultData("⚠️ Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    // Formatting the response
    let responseArray = response.split("**");
    let newResponse = " ";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");

    // Streaming words one by one
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
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
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
