/* eslint-disable*/
"use client";
import { SignInButton, SignOutButton } from "@/components/buttons";
import { signIn, signOut, useSession } from "next-auth/react";

function page() {
  const { data: session, status } = useSession();
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="bg-white flex flex-col px-6 py-4 space-y-4">
        <h1 className="text-2xl font-medium">Login To Get Started</h1>
        {status === "authenticated" ? (
          <button
            className="bg-black text-white py-2 px-3 hover:bg-white hover:border-2 hover:border-black hover:text-black"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="bg-black text-white py-2 px-3 hover:bg-white hover:border-2 hover:border-black hover:text-black"
            onClick={() =>
              signIn(
                "google",
                { callbackUrl: "http://localhost:3000" },
                { prompt: "login" }
              )
            }
          >
            SignIn with Google
          </button>
        )}
      </div>
    </div>
  );
}

export default page;
