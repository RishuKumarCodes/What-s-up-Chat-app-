import React, { useEffect, useRef } from "react";
import { LockOpen, MailOpen } from "lucide-react";

type Message = {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
};

function Messages({ messages, me }: { messages: Message[]; me: number }) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="overflow-y-auto h-full p-4">
      <div className="h-[60px]"></div>
      <div className="bg-[#F6EDD1] text-slate-600 m-auto w-[460px] p-3 rounded-md flex gap-3 ">
        <LockOpen width={38} />
        <p className="text-sm">
          Messages are not end-to-end encrypted, Only people of this chat and
          app owner can read the chat, unless database is hacked.
        </p>
      </div>
      {messages.length > 0 ? (
        <div className=" max-w-[1000px] w-[calc(100vw-100px-230px)] m-auto pb-[70px]">
          {messages.map((m) => (
            <div
              key={m.id + m.createdAt}
              className={`w-fit max-w-[80%] break-words text-wrap text-black rounded-2xl p-0.5 px-2.5 m-1 ${
                m.senderId == me
                  ? "bg-[#ffc7d3] ml-auto rounded-br-none"
                  : "bg-white rounded-bl-none"
              }`}
            >
              {m.content}
              <div
                className={`text-xs text-right -mt-1 pl-8 ${
                  m.senderId == me ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {new Date(m.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center h-[85%]">
          <div className="bg-black/30 text-white p-5 pb-8 rounded-lg w-56 flex flex-col items-center text-lg gap-5">
            No messages here yet!
            <MailOpen size={50} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
