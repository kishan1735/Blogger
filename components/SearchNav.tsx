"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function SearchNav({
  search,
  setSearch,
  border,
}: {
  search: string;
  setSearch: any;
  border: boolean;
}) {
  const { data: session, status } = useSession();
  return (
    <nav
      className={`max-w-kxl px-[6vh] py-[4vh]  bg-black flex justify-between opacity-90 items-center ${
        border ? "border-b-2 border-b-primary" : ""
      }`}
    >
      <Link
        href="/"
        className="text-black bg-accent px-2  text-3xl hover:scale-105"
      >
        Blogger
      </Link>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-center px-24 rounded-xl py-2 bg-secondary"
      />
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
                { callbackUrl: "http://localhost:3000" },
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

export default SearchNav;
