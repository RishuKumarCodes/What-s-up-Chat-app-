import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GradientKey } from "./Chat";

interface NavbarProps {
  other: {
    id: number | string;
    name?: string;
    image?: string;
  };
  selectedGradient: GradientKey;
  setSelectedGradient: React.Dispatch<React.SetStateAction<GradientKey>>;
  doodleVisible: boolean;
  setDoodleVisible: React.Dispatch<React.SetStateAction<boolean>>;
  gradients: Record<GradientKey, string>;
  onlineUserIds: Set<number>;
}
function Navbar({
  other,
  selectedGradient,
  setSelectedGradient,
  doodleVisible,
  setDoodleVisible,
  gradients,
  onlineUserIds,
}: NavbarProps) {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(onlineUserIds.has(Number(other.id)));
  }, [onlineUserIds, other.id]);

  return (
    <div className="flex items-center justify-between p-3 absolute w-full bg-white/10 backdrop-blur-sm">
      <div className="flex gap-4 items-center ">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={other.image || "/fallback.png"}
            alt={other.name || "User Avatar"}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-semibold text-lg h-6">
            Chatting with {other.name}
          </h2>
          <p className="text-xs text-zinc-600 -mt-0.5">
            {isOnline ? (
              <div className="flex items-center gap-1">
                <div className="size-2 bg-green-500 rounded-full mt-0.5" />
                <p>online</p>
              </div>
            ) : (
              "offline"
            )}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        {(Object.keys(gradients) as GradientKey[]).map((key) => (
          <button
            key={key}
            className={` w-8 h-8 rounded-full border-2 ${
              selectedGradient === key ? "border-black" : "border-gray-300"
            }  ${key === "none" ? "bg-gray-100" : gradients[key]}`}
            onClick={() => setSelectedGradient(key)}
            title={key}
          />
        ))}

        <button
          className={`px-3 py-1 text-sm rounded-full ${
            doodleVisible === true ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setDoodleVisible(!doodleVisible)}
        >
          Doodle
        </button>
      </div>
    </div>
  );
}

export default Navbar;
