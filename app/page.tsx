"use client";
import Nav from "@/components/Nav";
import SearchNav from "@/components/SearchNav";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <main className="max-w-kxl h-full flex flex-col bg-secondary">
      <Nav />
      <div className="border-t-2 border-primary"></div>
      <div className="bg-black opacity-90  h-[85vh] flex flex-col py-16">
        <h1 className="text-primary text-6xl my-auto px-8">
          The Best Premium Blogging Platform on Internet
        </h1>
        <button className="bg-primary py-2 ml-auto mr-4 border-2 border-primary text-2xl w-56 hover:bg-black hover:text-primary hover:scale-105">
          Get Started
        </button>
      </div>
    </main>
  );
}
