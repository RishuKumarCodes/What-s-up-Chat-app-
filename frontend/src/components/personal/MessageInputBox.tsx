"use client";
import React, { useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ArrowUp, Smile } from "lucide-react";

interface MessageInputBoxProps {
  send: () => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
}

function MessageInputBox({ send, setInput, input }: MessageInputBoxProps) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleEmojiSelect = (emoji: { native: string }) => {
    setInput((i) => i + emoji.native);
  };

  return (
    <div className="absolute w-full bottom-0 justify-center mx-auto flex gap-2 h-[60px]">
      <div className="flex flex-1 bg-white/20 backdrop-blur-md border border-white/50 rounded-full items-center gap-4 px-5 max-w-[800px] h-[50px] ">
        <button type="button" onClick={() => setShowPicker((show) => !show)}>
          <Smile opacity={0.5} color="#000" />
        </button>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              send();
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Type a message"
          className="w-full pb-1 h-full focus:outline-none "
        />
      </div>
      <button
        onClick={send}
        className="flex-nowrap send size-[50px] bg-rose-600 hover:bg-rose-700 rounded-full flex items-center justify-center cursor-pointer"
      >
        <ArrowUp color="#fff" />
      </button>
      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute bottom-[70px] left-[50px] z-20"
        >
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
}

export default MessageInputBox;
