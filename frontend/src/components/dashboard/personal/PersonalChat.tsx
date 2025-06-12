import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useSession } from "next-auth/react";

function PersonalChat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: session, status } = useSession();

  if (status != "authenticated") return <div>Unauthorized</div>;

  return (
    <div className="flex">
      <Sidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />

      {!selectedUser ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a user to start chatting
        </div>
      ) : (
        <Chat other={selectedUser} me={session.user} />
      )}
    </div>
  );
}

export default PersonalChat;
