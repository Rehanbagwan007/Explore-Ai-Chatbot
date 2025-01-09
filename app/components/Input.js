"use client";

import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import { FaMicrophone } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import { SpeechBox } from "./SpeechBox";
import "regenerator-runtime/runtime";

import { IoMdClose } from "react-icons/io";

const Input = ({ bgRemove }) => {
  const [deliver, setDeliver] = useState([]);
  const [value, setValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
  const [Bg , setBg] = useState(false)



  useEffect(()=>{

    
     setBg(true)  
    showInput ? setBg(!Bg) : ''
    showSpeech ? setBg(!Bg) : ''
    bgRemove(Bg)
  
  
  
  },[showInput , showSpeech])
  
    
 



  
  

  
  const GetData = (e) => {
    e.preventDefault();
    setShowSpeech(false);

    if (!value.trim()) return; // Prevent empty input submission.

    console.log("User entered input:", value);

    setDeliver((prevDeliver) => [...prevDeliver, { value }]); // Use functional state update.
    setValue('');
    setShowInput(true);

    console.log("Deliver array after update:", deliver);
  };

  
   const SpeechData =  ( data,x ) => {


  

    

    
   }

  



  

  return (
    <>
      {showSpeech ? <SpeechBox Scripts={SpeechData} /> : ''}
     

      < div className="w-screen flex justify-center overflow-hidden gap-1 ">
        {/* Microphone Button */}

        {showSpeech ?  <IoMdClose className="rounded h-[38px] w-[38px] p-2 bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 " onClick={()=>{
          setShowSpeech(!showSpeech) 
        }}/> :  <FaMicrophone
          className="rounded h-[38px] w-[38px] p-2 bg-transparent text-white bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500"
          onClick={() => {
            setShowSpeech(!showSpeech);
            setShowInput(!showInput);
          }} /> }
        

      {   }
        <input
          type="text"
          className="bg-zinc-950 text-white p-2 rounded-lg w-full max-w-[100%] sm:max-w-[35vw] border-pink-600"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your message..."
        />

        {/* Send Button */}
        <RiSendPlane2Fill
          className="rounded bg-transparent text-white bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 h-[38px] w-[38px] p-2"
          onClick={GetData}
        />
      </div>

      {/* ChatBox Display */}
      {showInput && <ChatBox inputData={deliver} />}
    </>
  );
}

export default Input;
