"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Globe, Users } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;

  return (
    <div className="w-[65px] flex flex-col items-center gap-4 py-4">
      <button
        onClick={() => router.push("/dashboard/group_chat")}
        className={`flex flex-col items-center justify-center gap-1 hover:bg-rose-100 rounded-md size-14 ${
          isActive("/dashboard/group_chat")
            ? "text-rose-600 bg-rose-50 border-b-2 border-r-1 border-red-200"
            : "text-gray-500"
        }`}
        aria-label="Global Chat"
      >
        <Globe size={24} />
        <span className="text-xs">Global</span>
      </button>

      <button
        onClick={() => router.push("/dashboard/personal_chat")}
        className={`flex flex-col items-center justify-center gap-1 hover:bg-rose-100 rounded-md size-14 ${
          isActive("/dashboard/personal_chat")
            ? "text-rose-600 bg-rose-50 border-b-2 border-r-1 border-red-200"
            : "text-gray-500"
        }`}
        aria-label="Personal Chat"
      >
        <Users size={24} />
        <span className="text-xs">Personal</span>
      </button>
    </div>
  );
}
