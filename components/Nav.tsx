"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Nav() {
  const { data: session, status } = useSession();
  return (
    <nav
      className={`px-6 py-4 w-screen h-[15vh] bg-black flex justify-between opacity-90 items-center`}
    >
      <Link
        href="/"
        className="text-black bg-accent px-2  text-3xl hover:scale-105 duration-400"
      >
        Blogger
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/createmdblog" className=" group text-primary">
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
            className="bg-primary border-2 border-primary text-black py-2 px-3 hover:bg-black hover:border-2 hover:border-primary hover:text-primary text-xl"
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
        ) : (
          <button
            className="bg-primary border-2 border-primary text-black py-2 px-3 hover:bg-black hover:border-2 hover:border-primary hover:text-primary text-xl"
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
