'use client';
import React,{useState}from 'react';

// interface SpeechRecognitionEvent extends Event {
//     results: SpeechRecognitionResultList;
//   }

const Manual=()=>{
  const[text, setText]=useState('');   
  const [isHearing, setisHearing] = useState(false); 
const[language,setLanguage] = useState('en-US');  
    // let recognize:undefined;
      let recognize: SpeechRecognition | undefined;

   // var webkitSpeechRecognition:any;

  const startListening=()=>{
    if('webkitSpeechRecognition'in window){
      recognize =new(window as any).webkitSpeechRecognition();
      recognize.lang=language  

      recognize.onstart=()=>{
        setisHearing(true)
      };
     recognize.onresult=(event:any)=>{
         setText(event.results[0][0].transcript)
        setisHearing(false);
      };

      recognize.onerror=()=>setisHearing(false)
       recognize.onend=()=>setisHearing(false)

recognize.start()}
    else{
      alert('voice Recognition not support in this browser please try another one browser');
    }
  };

  const stopListening=()=>{
    if(recognize){
      recognize.stop();  
      setisHearing(false);
    }
  };

  return(
    <div className="bg-black text-white h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Voice Detection</h1>

 
      <div className="mb-4">
        <label className="mr-2">Select Language:</label>
        <select
          value={language}
          onChange={(e)=>setLanguage(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
        </select>
      </div>


      <button
        onClick={startListening}
        className="bg-blue-500 text-white py-2 px-6 rounded-full mb-4"
      >
        {isHearing?'Listening...':'Press to Speak'}
      </button>

      <button
        onClick={stopListening}
        className="bg-red-500 text-white py-2 px-6 rounded-full mb-4"
      >
        Stop Listening
      </button>

      <p className="text-lg mt-2">{text}</p>
    </div>
  );
};

export default Manual;
