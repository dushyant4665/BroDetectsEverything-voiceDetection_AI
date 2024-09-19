'use client'
import React, { useState } from 'react';

const First = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  let recognition;
  if (typeof window !== 'undefined') {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
    };
  }

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Simple Voice Recognition in Next.js</h1>
      <button onClick={startListening} disabled={listening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop Listening
      </button>
      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          border: '1px solid black',
          minHeight: '100px',
        }}
      >
        <p>{transcript || 'Your speech will appear here...'}</p>
      </div>
    </div>
  );
};

export default First;
