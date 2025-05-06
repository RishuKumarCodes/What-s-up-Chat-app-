"use client";
import React, { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import Chats from "./Chats";

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
    <div className="flex">
      <ChatSidebar users={users} />
      {open ? (
        <ChatUserDialog open={open} setOpen={setOpen} group={group} />
      ) : (
        <ChatNav chatGroup={group} users={users} />
      )}
      oldMessages,
      <Chats group={group} chatUser={chatUser} oldMessages={oldMessages} />
    </div>
  );
}
