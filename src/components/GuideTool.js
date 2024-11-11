"use client";
import React, { useState } from 'react';

const GuideTool = () => {
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I assist you today?", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 

  const getBotResponse = (userMessage) => {
    const responses = {
      "hello": "Hello! How can I help you?",
      "what is your name": "I'm your friendly guide bot!",
      "how are you": "I'm just a bot, but I'm doing well, thank you for asking!",
      "help": "Sure, I can help you. Ask me anything about the website!",
      "default": "Sorry, I didn't understand that. Can you please rephrase?",
    };
    return responses[userMessage.toLowerCase()] || responses["default"];
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return; 
    
    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const botMessage = getBotResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, isBot: true },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      {/* Character Icon (Small & Animated) */}
      <div
        className={`fixed z-50 bottom-5 right-5 cursor-pointer transition-all duration-300 ease-in-out transform ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="p-2 bg-transparent rounded-full shadow-lg hover:bg-green-500 hover:shadow-2xl transition duration-300 ease-in-out">
          {/* Custom Small Character Icon */}
          <img
            src="/path/to/your-custom-image.png"  // Replace this with your own image path
            alt="AI Bot"
            className="w-8 h-8" // Makes the icon smaller (you can adjust this size)
          />
        </div>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed z-50 bottom-5 right-5 w-80 max-w-sm bg-white rounded-lg shadow-lg p-4 border border-gray-300 transform transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-3">
            <div className="font-semibold text-lg text-green-600">AI Guide Bot</div>
            <button
              className="text-xl text-gray-600"
              onClick={() => setIsOpen(false)} 
            >
              🗙
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-60 overflow-y-auto mb-3">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.isBot ? 'text-left' : 'text-right'}`}>
                <div
                  className={`inline-block p-2 rounded-lg ${message.isBot ? 'bg-gray-200' : 'bg-green-600 text-white'}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left mb-2">
                <div className="inline-block p-2 bg-gray-200 rounded-lg text-gray-600">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-green-600 text-white rounded-r-lg focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideTool;
