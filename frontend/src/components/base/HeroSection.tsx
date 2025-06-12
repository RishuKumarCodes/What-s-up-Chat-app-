import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative text-center p-12 bg-cover bg-center bg-no-repeat h-screen flex-col items-center content-center"
      style={{ backgroundImage: "url('/images/HeroSectionBg.jpg')" }}
    >
      {/* Optional overlay to improve text visibility */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0"></div>

      {/* Content goes here */}
      <div className="relative z-10 flex">
        <div className="flex-1 ">
          <h1 className="text-[10vw] font-semibold">Message</h1>
          <h1 className="text-[10vw] font-semibold">privately</h1>
        </div>

        <div className="flex-1 flex-col content-center items-center">
          <Link
            href="/dashboard"
            className="bg-rose-600 p-8 px-10 text-xl font-semibold text-white hover:bg-black transition-colors rounded-full"
          >
            Start Chatting
          </Link>
        </div>
      </div>
    </section>
  );
}
