import ChatBase from "@/components/chat/ChatBase";
import { fetchChats } from "@/fetch/chatFetch";
import { fetchChatGroup, fetchChatGroupUsers } from "@/fetch/groupFetch";
import { notFound } from "next/navigation";
import React from "react";
import { ChatGroupType, GroupChatUserType, MessageType } from "../../../../types";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (id.length != 36) {
    return notFound();
  }
  
  const group: ChatGroupType | null = await fetchChatGroup(id);
  if (group === null) {
    return notFound();
  }

  const users: Array<GroupChatUserType> | [] = await fetchChatGroupUsers(id);
  const chats: Array<MessageType> | [] = await fetchChats(id);
  console.log("the group id is :", id);
  
  return (
    <div className="overflow-hidden h-screen bg-[#F3F3F3] ">
      <ChatBase users={users} group={group} oldMessages={chats} />
    </div>
  );
}