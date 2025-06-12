"use client";
import React from "react";
import useSWR from "swr";
import Image from "next/image";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();
  return json.data;
};

export default function Sidebar({ onSelectUser, selectedUser }) {
  const { data: users, error } = useSWR(`/api/chat/personal`, fetcher);

  if (error) return <div>Error loading users</div>;
  if (!users) return <div>Loading...</div>;

  return (
    <div className="w-[300px] p-3 border-r border-gray-300 h-[calc(100vh-50px)]">
      <h1 className="font-semibold text-xl p-3 pb-1">Private chat</h1>
      <input type="text" className="w-full border p-2 mb-3" />

      {users.map((user) => (
        <div
          key={user.id}
          className={`flex items-center gap-3 hover:bg-gray-200 p-3 rounded-md cursor-pointer ${
            selectedUser?.id === user.id ? "bg-gray-200" : ""
          }`}
          onClick={() => onSelectUser(user)}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={user.image || "/fallback.png"}
              alt={user.name || "User Avatar"}
              fill
              className="object-cover"
            />
          </div>
          <h2 className="font-medium">{user.name}</h2>
        </div>
      ))}
    </div>
  );
}
