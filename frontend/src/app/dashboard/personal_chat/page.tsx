"use client";
import React, { useEffect, useState } from "react";
import Sidebar, { UserType } from "../../../components/personal/Sidebar";
import Chat from "../../../components/personal/Chat";
import { useSession } from "next-auth/react";
import { getPersonalSocket } from "@/lib/socket.config";
import type { Session } from "next-auth";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

type SessionWithCustomUser = Session & {
  user: CustomUser;
};
export default function PersonalChat() {
  const { data: rawSession, status } = useSession();
  const session = rawSession as SessionWithCustomUser;
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const [onlineUserIds, setOnlineUserIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (status !== "authenticated" || !session || !session.user) return;
    const sock = getPersonalSocket(
      Number(session.user.id),
      Number(session.user.id)
    );
    console.log("sock", sock, session.user.id);
    sock.connect();

    sock.on("online_users", (ids: number[]) => {
      setOnlineUserIds(new Set(ids));
    });

    sock.on("user_online", (id: number) => {
      setOnlineUserIds((prev) => new Set(prev).add(id));
    });

    sock.on("user_offline", (id: number) => {
      setOnlineUserIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    });

    return () => {
      sock.disconnect();
    };
  }, [session, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status != "authenticated") return <div>Unauthorized</div>;
  if (!session) return <div>Unauthorized</div>;

  return (
    <div className="flex">
      <Sidebar
        onSelectUser={setSelectedUser}
        selectedUser={selectedUser}
        onlineUserIds={onlineUserIds}
      />
      {!selectedUser ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a user to start chatting
        </div>
      ) : (
        <Chat
          other={selectedUser}
          me={{ ...session.user, id: Number(session.user.id) }}
          onlineUserIds={onlineUserIds}
        />
      )}
    </div>
  );
}
