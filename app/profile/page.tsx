"use client";
import AuthCheck from "@/components/AuthCheck";
import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";

function Wallet() {
  const [user, setUser] = useState<any>();
  const [transaction, setTransaction] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(function () {
    async function profile() {
      setError("");
      setLoading(true);
      const res = await fetch("/api/user", {
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      setLoading(false);
      if (data.status == "success") {
        setUser(data.user);
      } else {
        setError(data.message);
      }
    }
    profile();
  }, []);
  return (
    <AuthCheck>
      {loading ? (
        <Loading />
      ) : (
        <div
          className={`${
            transaction ? "h-full pb-[4vh] w-screen" : "h-screen"
          } min-h-screen flex flex-col bg-black opacity-[85%] items-center `}
        >
          <Nav />
          <div className="border-t-2 w-screen border-primary mb-[10vh]"></div>
          <div className="bg-black opacity-80 flex flex-col mb-[6vh] py-[8vh] border-2 space-y-[3vh] border-primary w-[80vw] items-center">
            <h1 className="text-4xl text-accent m-auto pb-[3vh]">
              {user?.name}
            </h1>
            <h1 className="text-primary text-lg text-center">{error}</h1>
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
            <button
              className="bg-primary border-black border-2 px-6 py-2 text-2xl hover:bg-black hover:text-primary hover:border-primary"
              onClick={() => setTransaction((el) => !el)}
            >
              {transaction ? "Show Less" : "View Transactions"}
            </button>
          </div>
          {transaction ? (
            <div className="bg-black opacity-80 flex flex-col py-[8vh] border-2 space-y-[3vh] border-primary w-[80vw] items-center">
              <h1 className="text-4xl text-accent m-auto pb-[3vh] uppercase">
                Transaction History
              </h1>
              <div className="grid gap-[4vh] grid-cols-2">
                {user?.transactionHistory.map((el: any) => {
                  return (
                    <div className="bg-primary p-[4vh] text-black" key={el.for}>
                      <div className="flex space-x-[1vw]">
                        <h1 className="text-xl font-bold">Amount:</h1>
                        <h1 className="text-xl">{el.amount}</h1>
                      </div>
                      <div className="flex space-x-[1vw]">
                        <h1 className="text-xl font-bold">For:</h1>
                        <h1 className="text-xl">{el.for}</h1>
                      </div>
                      <div className="flex space-x-[1vw]">
                        <h1 className="text-xl font-bold">Time:</h1>
                        <h1 className="text-xl">{el.time}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </AuthCheck>
  );
}

export default Wallet;
