import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../Context/Context";

const suggestions = [
  {
    title: "Plan a weekend trip",
    description: "Discover places worth exploring",
    icon: assets.compass_icon,
    prompt: "Suggest some beautiful places for a weekend trip.",
  },
  {
    title: "Understand a concept",
    description: "Explain something in simple words",
    icon: assets.bulb_icon,
    prompt: "Explain urban planning in simple words.",
  },
  {
    title: "Get creative ideas",
    description: "Brainstorm something new",
    icon: assets.message_icon,
    prompt: "Suggest some creative team bonding activities.",
  },
  {
    title: "Improve my code",
    description: "Make your code cleaner and better",
    icon: assets.code_icon,
    prompt: "How can I improve the readability of my code?",
  },
];

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleSubmit = () => {
    if (input.trim() && !loading) onSent();
  };

  return (
    <div className="main">
      <header className="nav">
        <div className="brand">
          {/* If your logo asset has a different name, change it here */}
          <img className="brand-logo" src={assets.gemini_icon} alt="" />
          <p>GemAI</p>
        </div>
        <img className="profile-image" src={assets.user_icon} alt="Profile" />
      </header>

      <div className="main-container">
        <div className="content">
          {!showResult ? (
            <div className="welcome-section">
              <div className="greet">
                <h1>
                  How can I help you <span>today?</span>
                </h1>
                <p>Ask anything. Let's explore together.</p>
              </div>

              <div className="cards">
                {suggestions.map((item, index) => (
                  <button
                    className="card"
                    key={index}
                    onClick={() => setInput(item.prompt)}
                  >
                    <div className="card-icon">
                      <img src={item.icon} alt="" />
                    </div>
                    <div>
                      <p className="card-title">{item.title}</p>
                      <p className="card-description">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="You" />
                <p>{recentPrompt}</p>
              </div>

              <div className="result-data">
                {/* Same logo as the navbar */}
                <img className="ai-avatar" src={assets.gemini_icon} alt="" />
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <div
                    className="response-content"
                    dangerouslySetInnerHTML={{ __html: resultData }}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        <div className="main-bottom">
          <div className="search-box">
            <input
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Message GemAI..."
            />
            <button
              className="send-button"
              onClick={handleSubmit}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <img src={assets.send_icon} alt="" />
            </button>
          </div>
          <p className="bottom-info">
            GemAI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
