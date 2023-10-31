"use client";
import Nav from "@/components/Nav";
import getStripe from "@/utils/stripe";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Page() {
  const [data, setData] = useState<any>();
  const { data: session, status } = useSession();
  useEffect(function () {
    async function getUser() {
      const res = await fetch("/api/user", {
        headers: { "Content-type": "application/json" },
      });
      const resData = await res.json();
      setData(resData.user);
      console.log(resData);
    }
    getUser();
  }, []);
  async function handleWallet() {
    const res = await fetch("/api/checkout_sessions", {
      headers: { "Content-type": "application/json" },
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: data?.session.id,
    });
    console.log(data);
  }
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
          <h1 className="text-primary text-3xl">Wallet Balance</h1>
          <h1 className="text-secondary text-3xl">{data?.walletBalance}</h1>
        </div>
        <button
          className="bg-primary text-black border-2 border-black text-2xl mx-auto px-4 py-2 hover:bg-black hover:text-primary hover:border-primary"
          onClick={handleWallet}
        >
          Add To Your Wallet
        </button>
      </div>
    </div>
  );
}

export default Page;
