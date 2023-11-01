"use client";
import AuthCheck from "@/components/AuthCheck";
import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import getStripe from "@/utils/stripe";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Page() {
  const [data, setData] = useState<any>();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const [amount, setAmount] = useState("");
  useEffect(function () {
    async function getUser() {
      setLoading(true);
      setError("");
      const res = await fetch("/api/user", {
        headers: { "Content-type": "application/json" },
      });
      const resData = await res.json();
      setLoading(false);
      if (resData.status == "success") {
        setData(resData.user);
      } else {
        setError(resData.message);
      }
    }
    getUser();
  }, []);
  async function handleWallet() {
    setError("");
    setLoading(true);
    const requestBody = { amount: +amount };
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    setLoading(false);
    const stripe = await getStripe();
    const { error }: { error: any } = await stripe!.redirectToCheckout({
      sessionId: data?.session.id,
    });
    if (error) {
      setError(error);
    }
    console.log(data);
  }
  return (
    <AuthCheck>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-screen min-h-screen max-w-kxl w-screen flex flex-col items-center bg-black opacity-[85%] ">
          <Nav />
          <div className="border-t-2 w-screen border-primary mb-[10vh]"></div>
          <div className=" bg-black border-2 border-primary w-[50vw] opacity-90 flex-col px-8  py-[8vh] space-y-8">
            <h1 className="text-accent text-4xl">Your Wallet</h1>
            <div className="flex space-x-16">
              <h1 className="text-primary text-3xl">Name</h1>
              <h1 className="text-secondary text-3xl">{session?.user?.name}</h1>
            </div>
            <div className="flex space-x-16">
              <h1 className="text-primary text-3xl">Wallet Balance</h1>
              <h1 className="text-secondary text-3xl">{data?.walletBalance}</h1>
            </div>
            <div className="flex justidy-between">
              <input
                type="text"
                className="bg-secondary rounded-xl text-xl text-center"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="bg-primary text-black border-2 border-black text-2xl mx-auto px-4 py-2 hover:bg-black hover:text-primary hover:border-primary"
                onClick={handleWallet}
              >
                Add To Your Wallet
              </button>
            </div>

            <h1 className="text-primary text-lg text-center">{err}</h1>
          </div>
        </div>
      )}
    </AuthCheck>
  );
}

export default Page;
