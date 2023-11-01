"use client";

import { signIn, signOut } from "next-auth/react";

export function SignInButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="bg-black text-white py-2 px-3 hover:bg-white hover:border-2 hover:border-black hover:text-black"
      onClick={() =>
        signIn(
          "google",
          { callbackUrl: `${process.env.URL}` },
          { prompt: "login" }
        )
      }
    >
      {children}
    </button>
  );
}

export function SignOutButton() {
  return (
    <button
      className="bg-black text-white py-2 px-3 hover:bg-white hover:border-2 hover:border-black hover:text-black"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
