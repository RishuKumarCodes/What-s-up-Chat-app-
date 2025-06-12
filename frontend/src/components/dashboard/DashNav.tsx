"use client";
import React from "react";
import Image from "next/image";
import ProfileMenu from "../auth/ProfileMenu";

export default function DashNav({
  image,
  name,
}: {
  image?: string;
  name: string;
}) {
  return (
    <nav className="h-[45px] py-2 px-5 flex justify-between items-center">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => window.location.reload()}
      >
        <Image src="/images/logo.svg" alt="Logo" width={25} height={25} />
        <h1 className="text-md text-black md:text-md ">What&apos;up?</h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        <ProfileMenu name={name} image={image} />
      </div>
    </nav>
  );
}
