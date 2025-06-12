import React from "react";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import DashNav from "@/components/dashboard/DashNav";
import ChatContainer from "@/components/dashboard/ChatContainer";

export default async function Page() {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="h-[100vh] w-[100vw] overflow-hidden bg-[#F3F3F3] ">
      <DashNav
        name={session.user.name}
        image={session.user.image ?? undefined}
      />
      <ChatContainer user={session.user} />
    </div>
  );
}
