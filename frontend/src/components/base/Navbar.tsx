"use client";
import React from "react";
import Link from "next/link";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "../ui/button";
import LoginModal from "../auth/LoginModal";
export default function Navbar({ user }: { user: CustomUser | null }) {
  return (
    <>
      <nav className="p-6 flex justify-between items-center bg-[#ffd9d9]/20 filter:blur(50) fixed w-full h-[80px] backdrop-blur-xl z-20">
        <h1 className="text-xl md:text-3xl text-rose-600 font-bold">What&apos;up?</h1>
        <div className="flex items-center space-x-2 md:space-x-6 ">
          {!user ? (
            <LoginModal />
          ) : (
            <Link href="/dashboard">
              <Button className="bg-rose-200 p-6 px-8 rounded-full border border-rose-700 text-rose-700 hover:text-white hover:bg-rose-700">
                Dashboard
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
