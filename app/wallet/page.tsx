"use client";
import Nav from "@/components/Nav";
import { useSession } from "next-auth/react";

function Page() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="h-screen flex flex-col items-center space-y-16 bg-secondary ">
      <Nav />

      <div className=" bg-black w-[50vw] opacity-90 flex-col px-8  py-6 space-y-8">
        <h1 className="text-accent text-4xl">Your Wallet</h1>
        <div className="flex space-x-16">
          <h1 className="text-primary text-3xl">Name</h1>
          <h1 className="text-secondary text-3xl">{session?.user?.name}</h1>
        </div>
        <div className="flex space-x-16">
          <h1 className="text-primary text-3xl">Your Balance</h1>
          <h1 className="text-secondary text-3xl">0</h1>
        </div>
        <button className="bg-primary text-black border-2 border-black text-2xl mx-auto px-4 py-2 hover:bg-black hover:text-primary hover:border-primary">
          Add To Your Wallet
        </button>
      </div>
    </div>
  );
}

export default Page;
