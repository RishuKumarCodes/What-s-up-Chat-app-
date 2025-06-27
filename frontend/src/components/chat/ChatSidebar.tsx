import React from "react";
import { GroupChatUserType } from "../../../types";

export default function ChatSidebar({
  users,
}: {
  users: Array<GroupChatUserType> | [];
}) {
  return (
    <div className="hidden md:block h-screen overflow-y-auto min-w-[250px] bg-muted px-2">
      <h1 className="text-xl font-extralight pt-4 px-2 text-black">Users Joined:</h1>
      {users.length > 0 &&
        users.map((item, index) => (
          <div key={index} className="rounded-md p-2 mt-2">
            <p className="font-semibold"> {item.name}</p>
            <p className="text-gray-600 text-xs">
              Joined : <span>{new Date(item.created_at).toDateString()}</span>
            </p>
          </div>
        ))}
    </div>
  );
}
