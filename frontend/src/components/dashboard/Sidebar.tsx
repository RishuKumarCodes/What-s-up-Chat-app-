"use client";

import React from "react";
import { Globe, Users } from "lucide-react";

interface SidebarProps {
  activeChat: "global" | "personal";
  setActiveChat: (chat: "global" | "personal") => void;
}

export default function Sidebar({ activeChat, setActiveChat }: SidebarProps) {
  return (
    <div className="w-[65px] flex flex-col items-center gap-4 py-4 ">
      <button
        onClick={() => setActiveChat("global")}
        className={`flex flex-col items-center justify-center gap-1 hover:bg-rose-100 rounded-md size-14 ${
          activeChat === "global" ? "text-rose-600 bg-rose-50 border-b-2 border-r-1 border-red-200" : "text-gray-500"
        }`}
        aria-label="Global Chat"
      >
        <Globe size={24} />
        <span className="text-xs">Global</span>
      </button>

      <button
        onClick={() => setActiveChat("personal")}
        className={`flex flex-col items-center justify-center gap-1 hover:bg-rose-100 rounded-md size-14 ${
          activeChat === "personal" ? "text-rose-600 bg-rose-50 border-b-2 border-r-1 border-red-200" : "text-gray-500"
        }`}
        aria-label="Personal Chat"
      >
        <Users size={24} />
        <span className="text-xs">Personal</span>
      </button>
    </div>
  );
}
