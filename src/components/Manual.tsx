'use client'
import React,{useState} from 'react'

const Manual=()=>{
    const [text,setText] = useState('')
    const [isHearing,setIsHearing] = useState(false)

    const hearing=()=>{
        const recognize=new window.webkitSpeechRecognition();
        recognize.continous=false;
        recognize.interimResults=false;
        recognize.lang='en-US', 'en-UK', 'en-IN';

    }


}

export default Manual