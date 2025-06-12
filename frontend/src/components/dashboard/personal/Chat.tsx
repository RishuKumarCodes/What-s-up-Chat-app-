"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import bgImg from "../../../../public/images/ChatBg.svg";
import { ArrowUp, LockOpen, MailOpen, Paperclip } from "lucide-react";
import Navbar from "./Navbar";
import { getPersonalSocket } from "@/lib/socket.config";

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
}

const gradients = {
  none: "",
  pink: "bg-gradient-to-br from-pink-100 to-pink-900/70 ",
  blue: "bg-gradient-to-br from-blue-100 to-blue-900/70",
  green: "bg-gradient-to-br from-green-200 via-green-100 to-white",
};

function Chat({ other, me }) {
  const [selectedGradient, setSelectedGradient] = useState<string>("pink");
  const [doodleVisible, setDoodleVisible] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const socket = useMemo(() => {
    const s = getPersonalSocket(me.id, other.id).connect();
    // fetch history
    // fetch(`/api/chat/history?user1=${me}&user2=${other}`)
    //   .then((r) => r.json())
    //   .then((history: Message[]) => setMessages(history));
    // console.log(s)
    return s;
  }, [me, other]);

  useEffect(() => {
    socket.on("personal_message", (msg: Message) => {
      setMessages((m) => [...m, msg]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const send = () => {
    if (!input.trim()) return;
    console.log("sender id: ", me.id, "recieverId", other.id, "content", input);
    socket.emit("personal_message", {
      senderId: me.id,
      receiverId: other.id,
      content: input.trim(),
    });
    setInput("")
  };

  return (
    <div
      className={`flex-1 flex flex-col relative ${gradients[selectedGradient]}`}
    >
      {doodleVisible && (
        <div
          className="absolute inset-0 z-0"
          style={{
            opacity: 0.5,
            backgroundImage: `url(${bgImg.src})`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
      )}

      <div className="relative z-10 flex flex-col h-[100%] overflow-hidden">
        <Navbar
          other={other}
          selectedGradient={selectedGradient}
          setSelectedGradient={setSelectedGradient}
          doodleVisible={doodleVisible}
          setDoodleVisible={setDoodleVisible}
          gradients={gradients}
        />

        {/* Chat messages */}
        <div className=" flex-1 text-sm text-gray-600 p-4">
          <div className="bg-[#F6EDD1] m-auto w-95 p-3 rounded-md flex gap-3">
            <LockOpen width={38} />
            <p>
              Messages are not end-to-end encrypted, Only people of this chat
              and app owner can read the chat, unless database is hacked.
            </p>
          </div>

          {messages.length > 0 ? (
            messages.map((m) => (
              <div
                key={m.id + m.createdAt}
                className={`max-w-sm rounded-lg p-2 ${
                  m.senderId === me.id
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {m.content}
              </div>
            ))
          ) : (
            <div className="flex-1 flex items-center justify-center h-[85%]">
              <div className="bg-black/30 text-white p-5 pb-8 rounded-lg w-56 flex flex-col items-center text-lg gap-5">
                No messages here yet!
                <MailOpen size={50} />
              </div>
            </div>
          )}
        </div>

        <div className=" mx-auto mb-4 flex gap-2">
          <div className="flex bg-white rounded-full items-center gap-4 px-5 w-[800px] h-[50px] ">
            <Paperclip opacity={0.5} />
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Type a message"
              className=" w-full h-full flex items-center focus:outline-none"
            />
          </div>
          <button
            onClick={send}
            className="send size-[50px] bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
          >
            <ArrowUp color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
