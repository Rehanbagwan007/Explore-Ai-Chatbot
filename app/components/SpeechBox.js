"use client";
import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import { FaMicrophone, FaPaperPlane, FaStop, FaSpinner } from "react-icons/fa";
import { BsChatSquareDots } from "react-icons/bs";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

export const SpeechBox = ({ Scripts }) => {
  let [Script, setScript] = useState("");
  Script.trim();

  let [speechData, setspeechData] = useState();
  let [AllData, setAllData] = useState([]);
  const [Send, SetSend] = useState(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <div className="text-white">Browser doesn't support speech recognition.</div>;
  }

  useEffect(() => {
    setScript(transcript);
  }, [transcript]);

  useEffect(() => {
    Scripts(Script, Send);
  }, [Script, Scripts]);

  const getapi = async () => {
    console.log(Script);

    SpeechRecognition.stopListening();
    SetSend(!Send);
    const res = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCbQAPwlULjcty6DIP24ZKz54QHQkECcdc",
      method: "post",
      data: {
        contents: [{ parts: [{ text: `${Script}` }] }],
      },
    });
    const answer = res.data.candidates[0].content.parts[0].text;
    console.log(answer);

    setAllData((prev) => [
      ...prev,
      { type: "question", text: Script },
      { type: "answer", text: answer },
    ]);

    speak(answer);

    setspeechData(answer);
    setScript("");
  };

  return (
    <div className="text-white rounded-lg z-10 w-[350px] h-[450px] relative md:left-[1.2%] bottom-[20vh] flex flex-col p-4 items-center bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 lg:left-[35%] shadow-2xl overflow-scroll animate-fadeIn">
      <div className="rounded w-[350px] h-[30px] flex flex-row justify-center items-center gap-2 text-lg font-bold">
        <BsChatSquareDots className="text-white" />
        Interactive Chat
      </div>

      <div className="mt-4 w-full flex flex-row justify-center items-center gap-4">
        <button
          className="rounded bg-green-500 text-white px-4 py-2 hover:bg-green-600 shadow-lg flex items-center gap-2 transition-transform transform hover:scale-110"
          onClick={() => {
            SpeechRecognition.startListening({ continuous: true });
          }}
        >
          <FaMicrophone />
          Start
        </button>
        <button
          className="rounded bg-red-500 text-white px-4 py-2 hover:bg-red-600 shadow-lg flex items-center gap-2 transition-transform transform hover:scale-110"
          onClick={SpeechRecognition.stopListening}
        >
          <FaStop />
          Stop
        </button>
        <button
          className="rounded bg-gray-500 text-white px-4 py-2 hover:bg-gray-600 shadow-lg flex items-center gap-2 transition-transform transform hover:scale-110"
          onClick={() => {
            getapi();
          }}
        >
          <FaPaperPlane />
          Send
        </button>
      </div>

      <div className="mt-4 w-full">
        {AllData.map((item, index) => (
          <p
            key={index}
            className={`p-2 my-2 rounded-lg ${
              item.type === "question"
                ? "bg-blue-500 text-left"
                : "bg-green-500 text-right"
            } shadow-md animate-slideIn`}
          >
            <strong>{item.type === "question" ? "Q: " : "A: "}</strong>
            {item.text}
          </p>
        ))}
      </div>

      <div className="mt-4 flex flex-col items-center">
        {listening ? (
          <div className="flex flex-col items-center">
            <FaSpinner className="animate-spin text-red-500 w-8 h-8" />
            <span className="mt-2 text-sm">Listening...</span>
          </div>
        ) : (
          <span className="text-sm">Click 'Start' to begin.</span>
        )}
      </div>
    </div>
  );
};
