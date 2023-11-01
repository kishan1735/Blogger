"use client";
import Nav from "@/components/Nav";
import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import Editor from "@/components/markdowneditor/Editor";
import Preview from "@/components/markdowneditor/Preview";
import AuthCheck from "@/components/AuthCheck";
function Page() {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState<any>();
  async function handleClick() {
    const requestBody = { name, content };

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    console.log(data.status);
    if (data.status === "success") {
      setContent("");
      setText("");
      setName("");
    }
  }
  const handleDocChange = useCallback((newDoc: string) => {
    setContent(newDoc);
  }, []);

  return (
    <AuthCheck>
      <div className="h-full flex flex-col space-y-6 w-screen bg-black opacity-90 pb-4">
        <Nav />
        <Head>
          <title>Blogger Markdown Editor</title>
          <meta
            name="description"
            content="Write blogs in markdown syntax to level up your productivity."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main
          className={`bg-black opacity-80 px-10 text-2xl min-h-screen flex flex-col gap-2`}
        >
          <div className="flex space-x-6 justify-center">
            <h1 className="text-primary text-3xl">Blog Name</h1>
            <input
              type="text"
              className="bg-primary px-10 py-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <h1 className={`text-primary text-3xl flex-0`}>Markdown Editor</h1>
          <div className="flex flex-1 w-full gap-4">
            <Editor initialDoc={text} onChange={handleDocChange} />
            <Preview doc={content} />
          </div>
        </main>
        <button
          className="bg-primary mx-auto py-4 text-2xl w-[20vw] border-black border-2 hover:bg-black hover:border-primary hover:text-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </AuthCheck>
  );
}

export default Page;
