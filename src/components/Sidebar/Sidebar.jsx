import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <aside className={`sidebar ${extended ? "extended" : "collapsed"}`}>
      <div className="sidebar-inner">
        <div className="top">
          <button
            className="menu-btn"
            onClick={() => setExtended((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            <img src={assets.menu_icon} alt="" />
          </button>

          <button onClick={newChat} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            <span className="label">New Chat</span>
          </button>

          <div className="recent">
            <p className="recent-title">Recent chats</p>
            {[...prevPrompts].reverse().map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="item"
                title={item}
              >
                <img src={assets.message_icon} alt="" />
                <span className="label">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bottom">
          <div className="item">
            <img src={assets.question_icon} alt="" />
            <span className="label">Help</span>
          </div>
          <div className="item">
            <img src={assets.history_icon} alt="" />
            <span className="label">Activity</span>
          </div>
          <div className="item">
            <img src={assets.setting_icon} alt="" />
            <span className="label">Settings</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
