"use client";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";

function Wallet() {
  const [user, setUser] = useState<any>();
  useEffect(function () {
    async function profile() {
      const res = await fetch("/api/user", {
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      setUser(data.user);
    }
    profile();
  }, []);
  return (
    <div className="h-screen flex flex-col bg-black opacity-80 items-center ">
      <Nav />
      <div className="border-t-2 w-screen border-primary mb-[10vh]"></div>
      <div className="bg-black opacity-80 flex flex-col py-[8vh] border-2 space-y-[2vh] border-primary w-[80vw] items-center">
        <h1 className="text-4xl text-accent m-auto pb-[1.5vh]">{user?.name}</h1>
        <div className="flex space-x-6">
          <h1 className="text-3xl text-primary m-auto">Email:</h1>
          <h1 className="text-3xl text-secondary m-auto">{user?.email}</h1>
        </div>
        <div className="flex space-x-6">
          <h1 className="text-3xl text-primary m-auto">Blogs Written:</h1>
          <h1 className="text-3xl text-secondary m-auto">
            {user?.blogs.length}
          </h1>
        </div>
        <div className="flex space-x-6">
          <h1 className="text-3xl text-primary m-auto">Wallet Balance:</h1>
          <h1 className="text-3xl text-secondary m-auto">
            {user?.walletBalance}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
