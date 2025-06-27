import React, { useState } from "react";
import useSWR from "swr";
import Image from "next/image";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();
  return json.data;
};

export interface UserType {
  id: number;
  name: string;
  image?: string;
}

interface SidebarProps {
  onSelectUser: (user: UserType) => void;
  selectedUser: UserType | null;
  onlineUserIds: Set<number>;
}

export default function Sidebar({
  onSelectUser,
  selectedUser,
  onlineUserIds,
}: SidebarProps) {
  const { data: users, error } = useSWR<UserType[]>(
    "/api/chat/personal",
    fetcher
  );
  const [filter, setFilter] = useState("");

  if (error) return <div>Error loading users</div>;
  if (!users) return <div>Loading...</div>;

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-[230px] xl:w-[300px] p-3 border-r border-gray-300 h-[calc(100vh-50px)]">
      <h1 className="font-semibold text-xl p-3 pb-1">Private Chat</h1>
      <div className="h-15 px-2 flex items-center mt-2 text-sm">
        <input
          type="text"
          className="w-full border p-1 px-2 mb-3 rounded focus:border-b-4 focus:border-rose-500"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {filtered.map((user) => {
        const isSelected = selectedUser?.id === user.id;
        const isOnline = onlineUserIds.has(user.id);

        if (isSelected) {
          console.log("clicked on user id:", user.id);
          console.log("onlineUserIds:", onlineUserIds);
        }

        return (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            className={`flex items-center gap-3 p-3 mb-1 rounded-md cursor-pointer ${
              isSelected ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <span
              className={`w-3.5 h-3.5 rounded-full mt-auto -m-1 -mr-6 z-10   ${
                isOnline ? "bg-green-500 border-white border-2" : ""
              }`}
              title={isOnline ? "Online" : "Offline"}
            />
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={user.image || "/fallback.png"}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-medium flex items-center gap-2">
                {user.name}
              </h2>
              <p className="text-xs text-zinc-600 -mt-0.5">
                {isOnline ? "online" : "offline"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
