import React, { useState, useEffect, useRef } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import "./AIChatBot.css";

import robotImg from "./friendly_ai_robot_assistant.png";

const AIChatBot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to Zerodha! I'm your intelligent trade companion. Whether you're a first-time visitor or a pro, I'm here to help you find the best stocks and navigate your dashboard. How can I assist you today?", sender: "ai" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (text = inputValue) => {
        const messageText = typeof text === 'string' ? text : inputValue;
        if (!messageText.trim()) return;

        const userMsg = { id: Date.now(), text: messageText, sender: "user" };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI Logic
        setTimeout(() => {
            let response = "";
            const query = messageText.toLowerCase();

            if (query.includes("recommend") || query.includes("buy") || query.includes("stocks")) {
                response = (
                    <div>
                        Great question! Based on current market trends, here are my top picks:
                        <div className="recommendation-card">
                            <p className="stock-name">RELIANCE</p>
                            <p className="reason">Strong fundamentals and multi-sector growth potential.</p>
                        </div>
                        <div className="recommendation-card">
                            <p className="stock-name">TCS</p>
                            <p className="reason">Leader in IT services with consistent dividend tracks.</p>
                        </div>
                    </div>
                );
            } else if (query.includes("market")) {
                response = "The markets are currently in a corrective phase, which often opens up brilliant long-term entry points for quality stocks.";
            } else if (query.includes("hello") || query.includes("hi")) {
                response = "Welcome back! Ready to explore some new opportunities or check your portfolio?";
            } else {
                response = "I'm still learning, but I can certainly help you with stock recommendations! Try asking 'What should I buy?'";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: "ai" }]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div className="ai-companion-hero">
            <div className="companion-left">
                <div className="companion-welcome">
                    <h3>Your Personal Companion</h3>
                    <h1>Intelligent Trading, Simplified.</h1>
                    <p>I assist you in real-time to find market opportunities and manage your wealth like a pro.</p>
                    <div className="robot-wrapper">
                        <img src={robotImg} alt="AI Robot" className="ai-robot-img" />
                    </div>
                </div>
            </div>

            <div className="companion-right">
                <div className="chatbot-window inline companion-mode">
                    <div className="chat-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <SmartToyIcon />
                            <h4>AI Trade Assistant</h4>
                        </div>
                    </div>

                    <div className="chat-messages" ref={messagesContainerRef}>
                        {messages.map(msg => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && <div className="typing-indicator">AI is analyzing...</div>}
                    </div>

                    <div className="quick-replies">
                        <div className="reply-chip" onClick={() => handleSend("What should I buy today?")}>Top Picks</div>
                        <div className="reply-chip" onClick={() => handleSend("Explain market status")}>Market Status</div>
                    </div>

                    <div className="chat-input-area">
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={() => handleSend()}>
                            <SendIcon fontSize="small" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChatBot;
