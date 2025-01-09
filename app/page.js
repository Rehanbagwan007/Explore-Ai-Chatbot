"use client"

import "regenerator-runtime/runtime";
import Background from "./components/Background";
import Input from "./components/Input";
import { useState } from "react";


export default function Home() {

  let [Value,setValue] = useState()

  const Data = (x) => {

   

    setValue(x)
  


  }

  console.log(Value)

   




  return (
    <div className="flex flex-col justify-between items-center w-full h-screen bg-zinc-800">
      <div className="relative flex-grow w-full flex justify-center items-center">
        <Background value={Value} />
      </div>

      <div className="w-screen p-1">
        <Input bgRemove={Data} />
      </div>
    </div>
  );
}
