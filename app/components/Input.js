"use client";

import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";


const Input = () => {
  const [deliver, setDeliver] = useState([]);
  const [value, setValue] = useState('');
  const [showInput, setShowInput] = useState(false);
 

  const GetData = (e) => {
    e.preventDefault();

    if (!value) return;

    console.log("User entered input:", value);

  
    setValue('');
    setShowInput(true);
    setDeliver([...deliver, { value }]); 

    console.log("Deliver array after update:", deliver); 

  }

  return (
    <>
   
      <div className="w-full flex justify-center overflow-hidden">
        <input
          type="text"
          className="bg-zinc-950 text-white p-2 rounded-lg w-full max-w-[90%] sm:max-w-[35vw] border-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="bg-transparent  shadow-lg text-white bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 w-[10vw] rounded-xl ml-5" onClick={GetData}>
          Enter
        </button>
      </div>

      {showInput && <ChatBox inputData={deliver} />}

      
    </>
  );
};

export default Input
