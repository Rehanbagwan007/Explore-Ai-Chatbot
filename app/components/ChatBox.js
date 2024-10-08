"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';


const ChatBox = ({ inputData }) => {
  
  const [allData, setAllData] = useState([]);  
  const [loading, setLoading] = useState(false); 
  const [response, setResponse] = useState(null);
  
  const data = inputData[inputData.length - 1]?.value || '';
  const previousDataRef = useRef(); 
  
  const GetAnswer = async () => {
    try {
      setLoading(true); 

      const res = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCbQAPwlULjcty6DIP24ZKz54QHQkECcdc",
        method: 'post',
        data: {
          contents: [{ parts: [{ text: `${data}` }] }],
        },
      });

      const answer = res.data.candidates[0].content.parts[0].text;
      setResponse(answer); 
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching answer:", error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (previousDataRef.current !== data && data.trim() !== '') {
      GetAnswer(); 
      previousDataRef.current = data; 
    }
  }, [data]);

  useEffect(() => {
    if (response && data) {
      setAllData((prevAllData) => [
        ...prevAllData, 
        { question: data, answer: response }
      ]);
      setResponse(null); 
    
    }
  }, [response]);

  const RenderedQA = allData.map((item, i) => (
    <div key={i} className="mb-4 p-4 bg-transparent rounded-lg shadow-lg bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500"> 
      <div className="text-yellow-300">Q: {item.question}</div>
      <div className="text-gray-100 mt-2">Explore Ai: {item.answer}</div> 
    </div>
  ));

  return (
    
      <div className="z-10 absolute bg-inherit top-[3vw] h-[77vh] right-[1vw] max-w-lg p-4 space-y-4 lg:left-[26vw] overflow-y-scroll w-auto"> 
        {RenderedQA}
        {loading && (
          <div className="mb-4 p-4 bg-transparent rounded-lg shadow-lg bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500">
            <div className="text-yellow-300">Q: {data}</div> 
            <div className="text-gray-100 mt-2">Loading...</div>
          </div>
        )}
      </div>
   
  );
};

export default ChatBox;
