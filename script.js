//detectVoiceType ek example function h 
// abhi ispe kaam krra huu


function detectVoiceType(transcript) {
  
    if (transcript.includes("Hello")) return "Human - Adult Male";
    if (transcript.includes("woof")) return "Animal - Dog";
    return "Unknown";
  }
  

  function startListening(){
    const listeningStatus=document.getElementById("listening-status");
    const transcriptText=document.getElementById("transcript-text");
    const voiceTypeText=document.getElementById("voice-type-text");
  
    listeningStatus.textContent="Listening...";
  
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.onstart=()=>{
 
      document.getElementById("mic-button").classList.add("active");
    };
  
    recognition.onresult=(event)=>{
      const transcript=event.results[0][0].transcript;
      transcriptText.textContent=transcript;
      voiceTypeText.textContent =detectVoiceType(transcript);
    };
  
    recognition.onerror = (event) => {
      listeningStatus.textContent = "Error: Please try again.";
      console.error("Speech recognition error", event.error);
    };
  
    recognition.onend=()=>{
      listeningStatus.textContent="Click to Start Listening";
      document.getElementById("mic-button").classList.remove("active");
    };
  
    recognition.start();
  }
  
