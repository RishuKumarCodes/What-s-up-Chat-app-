import React from "react";
import Image from "next/image";

function Navbar({
  other,
  selectedGradient,
  setSelectedGradient,
  doodleVisible,
  setDoodleVisible,
  gradients,
}: {
  other: any;
  selectedGradient: string;
  setSelectedGradient: React.Dispatch<React.SetStateAction<string>>;
  doodleVisible: boolean;
  setDoodleVisible: React.Dispatch<React.SetStateAction<boolean>>;
  gradients: object;
}) {
  return (
    <div className="flex items-center justify-between p-3 border-b bg-white">
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
          <p className="h-5 text-sm text-gray-500">offline</p>
        </div>
      </div>
      <div className="flex gap-2">
        {Object.keys(gradients).map((key) => (
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
