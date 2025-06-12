"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "./Sidebar";
import PersonalChat from "./personal/PersonalChat";

// dynamically import GlobalChat as a pure client component
const GlobalChat = dynamic(() => import("./Global/GlobalChat"), { ssr: false });

export default function ChatContainer() {
  const [activeChat, setActiveChat] = useState<"global" | "personal">("global");

  return (
    <div className="flex h-[calc(100vh_-_50px)]">
      <Sidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      <div className="flex-1 rounded-tl-2xl border-t border-l border-gray-300 bg-[#FCFCFC]">
        {activeChat === "global" ? (
          <GlobalChat />
        ) : (
          <PersonalChat/>
        )}
      </div>
    </div>
  );
}
