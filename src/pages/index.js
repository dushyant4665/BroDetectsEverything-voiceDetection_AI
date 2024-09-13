'use client'

import { useState, useEffect, useCallback } from 'react'

export default function VoiceSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.lang = 'en-US'
      recognitionInstance.interimResults = false
      recognitionInstance.maxAlternatives = 1

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setSearchTerm(transcript)
        setIsListening(false)
      }

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error)
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognition?.stop()
    } else {
      recognition?.start()
    }
    setIsListening(!isListening)
  }, [isListening, recognition])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm)
    // Implement your search logic here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
            placeholder="Search..."
          />
          <button
            type="button"
            onClick={toggleListening}
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
          >
            {isListening ? '⏹️' : '🎤'}
          </button>
          <button
            type="submit"
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Search"
          >
            🔍
          </button>
        </form>
      </div>
    </div>
  )
}