// import React from "react";

// import { getServerSession } from "next-auth";
// import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
// import CreateChat from "@/components/groupChat/CreateChat";
// import { fetchChatGroups } from "@/fetch/groupFetch";
// import GroupChatCard from "@/components/groupChat/GroupChatCard";

// export default async function GlobalChat() {
//   const session: CustomSession | null = await getServerSession(authOptions);

//   const user = session.user;
//   const groups: Array<ChatGroupType> = await fetchChatGroups(user?.token);

//   return (
//     <div>
//       <div className="container">
//         <div className="flex justify-center">
//           <CreateChat user={user} />
//         </div>
//       </div>
//       <div className="grid">
//         {groups.length > 0 &&
//           groups.map((item, index) => (
//             <GroupChatCard group={item} key={index} user={user} />
//           ))}
//       </div>
//     </div>
//   );
// }

// import CreateChat from "@/components/groupChat/CreateChat copy";
// import React from "react";
// import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
// import { getServerSession } from "next-auth";
// import { fetchChatGroups } from "@/fetch/groupFetch";

// async function GlobalChat() {
//   const session: CustomSession | null = await getServerSession(authOptions);

//   const user = session.user;
//   const groups: Array<ChatGroupType> = await fetchChatGroups(user?.token);

//   return (
//     <div>
//       asdf;lijasedfloi; aeoifaseifawesijfaweif
//       <div className="container">
//         <div className="flex justify-center">
//           <CreateChat user={user} />
//         </div>
//       </div>
//       <div className="grid">
//         {groups.length > 0 &&
//           groups.map((item, index) => (
//             <GroupChatCard group={item} key={index} user={user} />
//           ))}
//       </div>
//     </div>
//   );
// }

// export default GlobalChat;

"use client";
import React from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
// import DashNav from "@/components/dashboard/DashNav";
import CreateChat from "@/components/groupChat/CreateChat";
import GroupChatCard from "@/components/groupChat/GroupChatCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GlobalChatClient() {
  const { data: session, status } = useSession();
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
          groups.map((grp: any, i: number) => (
            <GroupChatCard group={grp} key={i} user={session.user} />
          ))
        ) : (
          <div>No groups yet.</div>
        )}
      </div>
    </div>
  );
}
