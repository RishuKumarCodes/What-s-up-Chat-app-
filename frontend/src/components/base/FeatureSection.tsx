import React from "react";

export default function FeatureSection() {
  return (
    <>
      <h1 className="m-[10%] text-[2.8vw] text-center">
        With private messaging, you can be yourself, speak freely
        and feel close to the most important people in your life no matter where
        they are.
      </h1>
      <section
        id="features"
        className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <h1 className="bg-rose-100 rounded-full p-8 px-20 w-fit m-auto text-3xl">🔒 Secure </h1>
        <h1 className="bg-rose-100 rounded-full p-8 px-20 w-fit m-auto text-3xl">💻Cross-Platform </h1>
        <h1 className="bg-rose-100 rounded-full p-8 px-20 w-fit m-auto text-3xl">🚀 Instant Setup</h1>
      </section>
    </>
  );
}
