import React from "react";
import DashNav from "@/components/dashboard/DashNav";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import CreateChat from "@/components/groupChat/CreateChat";
import { fetchChatGroups } from "@/fetch/groupFetch";
import GroupChatCard from "@/components/groupChat/GroupChatCard";

export default async function Page() {
  const session: CustomSession | null = await getServerSession(authOptions);
  console.log(session)
  if (!session || !session.user) {
    return <div>Unauthorized</div>;
  }

  const user = session.user;
  const groups: Array<ChatGroupType> = await fetchChatGroups(user?.token);

  return (
    <div>
      <DashNav name={user.name} image={user.image ?? undefined} />
      <div className="container">
        <div className="flex justify-center">
          <CreateChat user={user} />
        </div>
      </div>
      <div className="grid">
        {groups.length > 0 &&
          groups.map((item, index) => (
            <GroupChatCard group={item} key={index} user={user} />
          ))}
      </div>
    </div>
  );
}
