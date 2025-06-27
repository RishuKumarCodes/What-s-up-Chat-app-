import React from "react";
import MobileChatSidebar from "./MobileChatSidebar";
import { ChatGroupType, GroupChatUserType } from "../../../types";

export default function ChatNav({
  chatGroup,
  users,
  user,
}: {
  chatGroup: ChatGroupType;
  users: Array<GroupChatUserType> | [];
  user?: GroupChatUserType;
}) {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-2">
      <div className="flex-1 flex space-x-4 md:space-x-0 items-center justify-between">
        <div className="md:hidden">
          <MobileChatSidebar users={users} />
        </div>
        <div className="flex items-center justify-center ">
          <h1 className="font-semibold mr-1.5">chat-room:</h1>
          <h1 className="text-lg font-semibold text-rose-600">{chatGroup.title}</h1>
        </div>
        <p>Created At: {new Date(chatGroup.created_at).toDateString()}</p>
      </div>
      <p>{user?.name}</p>
    </nav>
  );
}
