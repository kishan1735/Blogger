"use client";
import Nav from "@/components/Nav";
import { useSession } from "next-auth/react";
import { useState } from "react";

function Page() {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  async function handleClick() {
    const requestBody = { name, content: text };

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    if (data.status === "success") {
      setText("");
      setName("");
    }
  }
  return (
    <div className="h-full w-screen bg-secondary flex flex-col space-y-6 w-screen pb-2">
      <Nav />
      <div className="bg-black flex flex-col space-y-4 px-8 py-8 h-[100vh] opacity-90 mx-[30vh]">
        <h1 className="text-accent text-2xl text-center uppercase">
          Create Blog
        </h1>
        <div className="flex space-x-6 justify-center">
          <h1 className="text-primary text-xl">Name</h1>
          <input
            type="text"
            className="bg-secondary px-8"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-accent text-xl text-center">Content</h1>
          <textarea
            className="bg-secondary px-8 h-[50vh] w-120  py-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button
          className="bg-primary mx-72 py-2 border-black border-2 hover:bg-black hover:border-primary hover:text-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Page;
