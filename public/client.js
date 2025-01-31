document.addEventListener("DOMContentLoaded", () => {
    const displayDiv = document.getElementById('textDisplay');
    let socket;
    let audioContext, source, processor;
    let ttsUtterance;
    let isMicActive = true; // New variable to track microphone status
    let canSendWebSocket = true; // Flag to control WebSocket communication

    function setupWebSocket() {
        socket = new WebSocket("ws://97.119.112.191:40001");
        socket.onopen = () => {
            console.log("Connected to WebSocket server.");
            updateStatusMessage("👄 Start speaking 👄");
        };

        socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'final') {
                console.log("Received final transcription: ", data.text);
                displayRealtimeText(data.text);
                const response = await sendQuery(data.text);
                canSendWebSocket = false; // Disable WebSocket communication

                await speak(response);
                canSendWebSocket = true; // Re-enable WebSocket communication
            }
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            alert("WebSocket error - check console for details.");
        };
    }

    async function sendQuery(text) {
        if (!canSendWebSocket) {
            console.log("WebSocket communication is temporarily disabled.");
            return; // Return or handle appropriately if WebSocket communication is disabled
        }
        const response = await fetch('https://mustang-helpful-lively.ngrok-free.app/rag/response', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({question: text})
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    function speak(text) {
        return new Promise((resolve, reject) => {
            if (!isMicActive) {
                console.log("Attempt to speak when mic is inactive.");
                reject("Microphone is not active.");
                return;
            }
            ttsUtterance = new SpeechSynthesisUtterance(text);
            ttsUtterance.onstart = () => {
                console.log("Speech synthesis started.");
                processor.disconnect(); // Disconnect the processor to stop capturing
                isMicActive = false; // Set microphone status to inactive
                updateStatusMessage("🔊 Speaking...");
            };
            ttsUtterance.onend = () => {
                console.log("Speech synthesis ended.");
                processor.connect(audioContext.destination); // Reconnect processor
                isMicActive = true; // Set microphone status to active
                updateStatusMessage("👄 Start speaking 👄");
                resolve();
            };
            ttsUtterance.onerror = (event) => {
                console.error("Speech synthesis failed:", event.error);
                reject(event.error);
            };
            window.speechSynthesis.speak(ttsUtterance);
        });
    }
    
    function displayRealtimeText(text) {
        displayDiv.textContent = text;
    }

    function updateStatusMessage(message) {
        displayDiv.textContent = message;
    }

    navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
        audioContext = new AudioContext();
        source = audioContext.createMediaStreamSource(stream);
        processor = audioContext.createScriptProcessor(256, 1, 1);
        source.connect(processor);
        processor.connect(audioContext.destination);

        processor.onaudioprocess = function (e) {
            if (!isMicActive || !canSendWebSocket) return; // Skip processing if conditions aren't met
            let inputData = e.inputBuffer.getChannelData(0);
            let outputData = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
                outputData[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768));
            }
            if (socket && socket.readyState === WebSocket.OPEN) {
                let metadata = JSON.stringify({sampleRate: audioContext.sampleRate});
                let metadataBytes = new TextEncoder().encode(metadata);
                let metadataLength = new ArrayBuffer(4);
                new DataView(metadataLength).setInt32(0, metadataBytes.byteLength, true);
                let combinedData = new Blob([metadataLength, metadataBytes, outputData.buffer]);
                socket.send(combinedData);
            }
        };
    }).catch(e => {
        console.error("Error accessing microphone:", e);
        alert("Error accessing microphone - check console for details.");
    });

    setupWebSocket();
});