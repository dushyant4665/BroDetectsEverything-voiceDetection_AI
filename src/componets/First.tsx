'use client';

import { useState } from 'react';

export default function First() {
  const [text, setText] = useState('');      // Holds the recognized speech
  const [isListening, setIsListening] = useState(false); // Tracks whether listening or not

  // Function to start voice recognition
  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition(); // Use webkit for Chrome support
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Set language as per your need

    recognition.onstart = () => {
      setIsListening(true); // Start animation
    };

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript); // Get the recognized text
      setIsListening(false); // Stop animation after result
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition:', event.error);
      setIsListening(false); // Stop animation on error
    };

    recognition.onend = () => {
      setIsListening(false); // Stop animation after end
    };

    recognition.start();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bro Detects Everything</h1>

      {/* The voice search button */}
      <div
        onClick={startListening}
        className={`voice-button ${isListening ? 'listening' : ''}`}
        style={styles.voiceButton}
      >
        {isListening ? 'Listening...' : 'Click to Speak'}
      </div>

      {/* Display the recognized text */}
      <p style={styles.result}>{text}</p>

      {/* Styles for the button animation */}
      <style jsx>{`
        .voice-button {
          padding: 20px 40px;
          font-size: 1.5rem;
          color: #fff;
          background-color: #333;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background-color 0.3s ease;
          border: 4px solid white;
        }

        .listening {
          animation: pulse 1s infinite; /* Pulse animation while listening */
          background-color: #1db954; /* Change button color while listening */
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000',
    color: '#fff',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  voiceButton: {
    padding: '1rem 2rem',
    fontSize: '1.5rem',
    color: '#fff',
    backgroundColor: '#333',
    border: '2px solid #fff',
    borderRadius: '50px',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.3s ease',
  },
  result: {
    marginTop: '2rem',
    fontSize: '1.5rem',
    border: '2px solid #fff',
    padding: '1rem',
    borderRadius: '10px',
    width: '60%',
    wordWrap: 'break-word',
  },
};
