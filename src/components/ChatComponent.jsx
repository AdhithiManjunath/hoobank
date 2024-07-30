import React, { useState } from "react";

const ChatComponent = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!text.trim()) return;

    // Add the user message to the chat
    setMessages([...messages, { type: "user", text }]);

    try {
      const response = await fetch(
        "https://mustang-helpful-lively.ngrok-free.app/rag/response",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: text }),
        }
      );

      const data = await response.json();

      // Add the response message to the chat
      setMessages([
        ...messages,
        { type: "user", text },
        { type: "response", text: data.response },
      ]);
    } catch (error) {
      console.error("Error fetching the response:", error);
      // Optionally, add an error message to the chat
      setMessages([
        ...messages,
        { type: "user", text },
        {
          type: "response",
          text: "Sorry, there was an error fetching the response.",
        },
      ]);
    }

    // Clear the input field
    setText("");
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-screen-lg mx-auto my-auto mt-10  p-4 rounded-lg bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start mb-3 ${
              msg.type === "user" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[60%] p-3 rounded-lg break-words ${
                msg.type === "user"
                  ? "bg-cyan-400 text-black"
                  : "bg-gray-700 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSend}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
