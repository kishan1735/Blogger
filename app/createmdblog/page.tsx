"use client";
import Nav from "@/components/Nav";
import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import Editor from "@/components/markdowneditor/Editor";
import Preview from "@/components/markdowneditor/Preview";
import AuthCheck from "@/components/AuthCheck";
import Loading from "@/components/Loading";
function Page() {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleClick(plan: string) {
    const requestBody = { name, content, plan };
    setLoading(true);
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    setLoading(false);
    console.log(data.status);
    if (data.status === "success") {
      setContent("");
      setText("");
      setName("");
      setError("");
    } else {
      setError(data.message);
    }
  }
  const handleDocChange = useCallback((newDoc: string) => {
    setContent(newDoc);
  }, []);

  return (
    <AuthCheck>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-full min-h-screen flex flex-col space-y-6 w-screen bg-black opacity-[85%] pb-4">
          <Nav />
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
            <h1 className="text-primary text-lg text-center py-2">{error}</h1>
            <h1 className={`text-primary text-3xl flex-0`}>Markdown Editor</h1>
            <div className="flex flex-1 w-full gap-4">
              <Editor initialDoc={text} onChange={handleDocChange} />
              <Preview doc={content} />
            </div>
          </main>
          <button
            className="bg-primary mx-auto py-4 text-2xl w-[40vw] border-black border-2 hover:bg-black hover:border-primary hover:text-primary"
            onClick={() => handleClick("premium")}
          >
            Post as Premium Content
          </button>
          <button
            className="bg-primary mx-auto py-4 text-2xl w-[40vw] border-black border-2 hover:bg-black hover:border-primary hover:text-primary"
            onClick={() => handleClick("normal")}
          >
            Post as Free Content
          </button>
        </div>
      )}
    </AuthCheck>
  );
}

export default Page;
