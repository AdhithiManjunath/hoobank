// src/AudioStreamer.js
import React, { useEffect, useState } from "react";

const AudioStreamer = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("👄 Start speaking 👄");
  const [socket, setSocket] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [source, setSource] = useState(null);
  const [processor, setProcessor] = useState(null);
  const [ttsUtterance, setTtsUtterance] = useState(null);
  const [isMicActive, setIsMicActive] = useState(true);
  const [canSendWebSocket, setCanSendWebSocket] = useState(true);

  useEffect(() => {
    setupWebSocket();
    setupAudioContext();
    return () => {
      if (socket) socket.close();
    };
  }, []);

  const setupWebSocket = () => {
    const ws = new WebSocket("ws://97.119.112.191:40001");
    ws.onopen = () => {
      console.log("Connected to WebSocket server.");
      setStatus("👄 Start speaking 👄");
    };

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "final") {
        console.log("Received final transcription: ", data.text);
        setText(data.text);
        const response = await sendQuery(data.text);
        setCanSendWebSocket(false);

        await speak(response);
        setCanSendWebSocket(true);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      alert("WebSocket error - check console for details.");
    };

    setSocket(ws);
  };

  const setupAudioContext = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const ac = new AudioContext();
        const src = ac.createMediaStreamSource(stream);
        const proc = ac.createScriptProcessor(256, 1, 1);

        src.connect(proc);
        proc.connect(ac.destination);

        proc.onaudioprocess = function (e) {
          if (!isMicActive || !canSendWebSocket) return;
          let inputData = e.inputBuffer.getChannelData(0);
          let outputData = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            outputData[i] = Math.max(
              -32768,
              Math.min(32767, inputData[i] * 32768)
            );
          }
          if (socket && socket.readyState === WebSocket.OPEN) {
            let metadata = JSON.stringify({ sampleRate: ac.sampleRate });
            let metadataBytes = new TextEncoder().encode(metadata);
            let metadataLength = new ArrayBuffer(4);
            new DataView(metadataLength).setInt32(
              0,
              metadataBytes.byteLength,
              true
            );
            let combinedData = new Blob([
              metadataLength,
              metadataBytes,
              outputData.buffer,
            ]);
            socket.send(combinedData);
          }
        };

        setAudioContext(ac);
        setSource(src);
        setProcessor(proc);
      })
      .catch((e) => {
        console.error("Error accessing microphone:", e);
        alert("Error accessing microphone - check console for details.");
      });
  };

  const sendQuery = async (text) => {
    if (!canSendWebSocket) {
      console.log("WebSocket communication is temporarily disabled.");
      return;
    }
    const response = await fetch(
      "https://mustang-helpful-lively.ngrok-free.app/rag/response",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const speak = (text) => {
    return new Promise((resolve, reject) => {
      if (!isMicActive) {
        console.log("Attempt to speak when mic is inactive.");
        reject("Microphone is not active.");
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => {
        console.log("Speech synthesis started.");
        processor.disconnect();
        setIsMicActive(false);
        setStatus("🔊 Speaking...");
      };
      utterance.onend = () => {
        console.log("Speech synthesis ended.");
        processor.connect(audioContext.destination);
        setIsMicActive(true);
        setStatus("👄 Start speaking 👄");
        resolve();
      };
      utterance.onerror = (event) => {
        console.error("Speech synthesis failed:", event.error);
        reject(event.error);
      };
      window.speechSynthesis.speak(utterance);
      setTtsUtterance(utterance);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white p-4">
      <div className="text-center mb-4 max-w-2xl w-full p-4 bg-gray-900 rounded-lg shadow-lg">
        <p className="text-lg font-bold">{status}</p>
        <p className="text-xl mt-4 whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
};

export default AudioStreamer;
