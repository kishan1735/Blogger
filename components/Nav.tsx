"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Nav() {
  const { data: session, status } = useSession();
  return (
    <nav className="max-w-kxl px-6 py-4 bg-black flex justify-between opacity-90 items-center w-screen">
      <Link
        href="/"
        className="text-black bg-accent px-2  text-2xl hover:scale-105 duration-400"
      >
        Blogger
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/createblog" className=" group text-primary">
          <h1 className="text-2xl">Create Blog</h1>
          <div className="mx-2 group-hover:border-b-2 group-hover:border-primary"></div>
        </Link>
        <Link href="/blogs" className=" group text-primary">
          <h1 className="text-2xl">View Blogs</h1>
          <div className="mx-2 group-hover:border-b-2 group-hover:border-primary"></div>
        </Link>
        <Link href="/wallet" className=" group text-primary">
          <h1 className="text-2xl">Wallet</h1>
          <div className="mx-2 group-hover:border-b-2 group-hover:border-primary"></div>
        </Link>
        <Link href="/profile" className=" group text-primary">
          <h1 className="text-2xl">Profile</h1>
          <div className="mx-2 group-hover:border-b-2 group-hover:border-primary"></div>
        </Link>
        {status !== "authenticated" ? (
          <button
            className="bg-primary border-2 border-primary text-black py-2 px-3 hover:bg-background hover:border-2 hover:border-black"
            onClick={() =>
              signIn(
                "google",
                { callbackUrl: "http://localhost:3000" },
                { prompt: "login" }
              )
            }
          >
            Sign In
          </button>
        ) : (
          <button
            className="bg-primary border-2 border-primary text-black py-2 px-3 hover:bg-background hover:border-2 hover:border-black"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}
export default Nav;
