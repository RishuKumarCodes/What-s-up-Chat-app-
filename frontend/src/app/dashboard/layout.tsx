// "use client";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import DashNav from "@/components/dashboard/DashNav";
// import ChatContainer from "@/components/dashboard/ChatContainer";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="h-[100vh] w-[100vw] overflow-hidden bg-[#F3F3F3]">
      <DashNav
        name={session.user.name}
        image={session.user.image ?? undefined}
      />
      {/* <ChatContainer user={session.user} /> */}
      <div className="flex h-[calc(100vh_-_45px)]">
        <Sidebar />
        <main className="flex-1 rounded-tl-2xl border-t border-l border-gray-300 bg-[#FCFCFC]">
          {children}
        </main>
      </div>
    </div>
  );
}
