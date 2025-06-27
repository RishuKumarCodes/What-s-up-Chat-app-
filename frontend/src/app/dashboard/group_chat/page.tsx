"use client";
import React from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import CreateChat from "@/components/groupChat/CreateChat";
import GroupChatCard from "@/components/groupChat/GroupChatCard";
import { ChatGroupType } from "../../../../types";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import type { Session } from "next-auth";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type SessionWithCustomUser = Session & { user: CustomUser };

export default function GlobalChatClient() {
  const { data: rawSession, status } = useSession();

  const session = rawSession as SessionWithCustomUser;

  const { data: groups, error } = useSWR(
    () =>
      status === "authenticated"
        ? `/api/chat/groups?token=${session?.user?.token}`
        : null,
    fetcher
  );

  if (status === "loading") return <div>Loading session…</div>;
  if (!session) return <div>Unauthorized</div>;
  if (error) return <div>Failed to load groups</div>;

  return (
    <div className="m-5">
      <CreateChat user={session.user} />
      <div className="flex gap-6 flex-wrap">
        {groups?.length ? (
          groups.map((grp: ChatGroupType, i: number) => (
            <GroupChatCard group={grp} key={i} user={session.user} />
          ))
        ) : (
          <div>No groups yet.</div>
        )}
      </div>
    </div>
  );
}
