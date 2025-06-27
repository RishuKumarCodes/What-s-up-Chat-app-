"use client";
import React, { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import Chats from "./Chats";
import { ChatGroupType, GroupChatUserType, MessageType } from "../../../types";

export default function ChatBase({
  group,
  users,
  oldMessages,
}: {
  group: ChatGroupType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();
  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      const pData = JSON.parse(data);
      setChatUser(pData);
    }
  }, [group.id]);

  return (
    <>
      {open ? (
        <ChatUserDialog open={open} setOpen={setOpen} group={group} />
      ) : (
        <ChatNav chatGroup={group} users={users} />
      )}
      <div className="flex">
        <ChatSidebar users={users} />
        <div className="flex-1 bg-white rounded-tl-2xl border border-gray-200">
          <Chats group={group} chatUser={chatUser} oldMessages={oldMessages} />
        </div>
      </div>
    </>
  );
}
