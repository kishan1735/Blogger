"use client";
import Nav from "@/components/Nav";
import { useSession } from "next-auth/react";

function Page() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="h-screen flex flex-col items-center space-y-16 bg-secondary">
      <Nav />
      <div className="bg-black opacity-90 flex">
        <div className="flex flex-col px-8 py-6 space-y-8">
          <h1 className="text-primary text-4xl uppercase">Your wallet</h1>
          <div className="flex space-x-16">
            <h1 className="text-primary text-xl">Name</h1>
            <h1 className="text-secondary text-xl">{session?.user?.name}</h1>
          </div>
          <div className="flex space-x-16">
            <h1 className="text-primary text-3xl uppercase ">Your Balance</h1>
            <h1 className="text-secondary text-xl">"Balance"</h1>
          </div>
        </div>
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
}

export default Page;
