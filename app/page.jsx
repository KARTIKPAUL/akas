"use client";
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [message, setMessage] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex h-screen">
        {/* Sidebar */}
      <Sidebar expand={expand} setExpand={setExpand}/>

        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => (expand ? setExpand(false) : setExpand(true))}
              className="rotate-180"
              src={assets.menu_icon}
              alt="menuItem"
            />
            <Image
              className="opecity-70"
              src={assets.chat_icon}
              alt="chatIcon"
            />
          </div>
          {message.length === 0 ? <>
          <div className="flex items-center gap-3">
            <Image 
            src={assets.logo_icon}
            alt="logoIcon"
            className="h-16"
            />
            <p className="text-2xl font-medium">Hi, I&apos;m Akas</p>
           
          </div>

          <p className="text-sm mt-2 ">How can I Help You Today?</p>
          </> : <div>
            <Message role='user' content='What Is amai'/>
            </div>}
          {/* Prompt Box */}

          <PromptBox isLoading={isloading} setIsLoading={setIsLoading}/>


          <p className="text-xs absolute bottom-1 text-gray-500">Ai Generated,For Referance Only!</p>

        </div>
      </div>
    </div>
  );
}
