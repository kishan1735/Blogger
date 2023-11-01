"use client";

import { signIn, useSession } from "next-auth/react";
import Nav from "./Nav";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  if (status == "authenticated") {
    return <>{children}</>;
  } else if (status == "loading") {
    return (
      <div className="bg-black h-screen opacity-[85%] flex flex-col space-y-[12vh] w-screen items-center">
        <Nav />
        <h1 className="text-primary text-4xl ">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="bg-black h-screen opacity-80 flex flex-col justify-center items-center space-y-[6vh]">
        <h1 className="text-primary text-6xl">Login for access</h1>
        <button
          className="bg-primary border-2 border-primary text-black py-[4vh] px-[5vh] hover:bg-black hover:border-2 hover:border-primary hover:text-primary text-4xl"
          onClick={() =>
            signIn(
              "google",
              { callbackUrl: `${process.env.URL}` },
              { prompt: "login" }
            )
          }
        >
          Sign In
        </button>
      </div>
    );
  }
}
