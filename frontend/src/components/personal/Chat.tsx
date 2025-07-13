"use client";
import React, { useEffect, useMemo, useState } from "react";
import bgImg from "../../../public/images/ChatBg.svg";
import Navbar from "./Navbar";
import { getPersonalSocket } from "@/lib/socket.config";
import { PersonalChatHistory } from "@/fetch/PersonalChatHistoryFetch";
import Messages from "./Messages";
import MessageInputBox from "./MessageInputBox";

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
}
interface User {
  id: number;
  name: string;
  image?: string;
}

interface ChatProps {
  other: User;
  me: User;
  onlineUserIds: Set<number>;
}
export type GradientKey = "none" | "pink" | "blue" | "green";

const gradients: Record<GradientKey, string> = {
  none: "",
  pink: "bg-gradient-to-br from-pink-100 to-pink-900/70 ",
  blue: "bg-gradient-to-br from-blue-100 to-blue-900/70",
  green: "bg-gradient-to-br from-green-200 via-green-100 to-white",
};

function Chat({ other, me, onlineUserIds }: ChatProps) {
  const [selectedGradient, setSelectedGradient] = useState<GradientKey>("pink");
  const [doodleVisible, setDoodleVisible] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const socket = useMemo(
    () => getPersonalSocket(me.id, other.id),
    [me.id, other.id]
  );

  useEffect(() => {
    if (!socket.connected) socket.connect();

    const handler = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("personal_message", handler);

    return () => {
      socket.off("personal_message", handler);
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    (async () => {
      const history = await PersonalChatHistory(me.id, other.id);
      setMessages(history);
    })();
  }, [me.id, other.id]);

  const send = () => {
    if (!input.trim()) return;
    socket.emit("personal_message", {
      senderId: me.id,
      receiverId: other.id,
      content: input.trim(),
    });
    setInput("");
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.floor(Math.random() * 10000),
        senderId: me.id,
        receiverId: other.id,
        content: input.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div
      className={`h-[calc(100vh-45px)] flex-1 relative  ${gradients[selectedGradient]}`}
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
          onlineUserIds={onlineUserIds}
        />

        <div className="flex-1 overflow-hidden">
          <Messages messages={messages} me={me.id} />
        </div>

        <MessageInputBox send={send} setInput={setInput} input={input} />
      </div>
    </div>
  );
}

export default Chat;
