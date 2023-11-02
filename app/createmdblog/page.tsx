"use client";
import Nav from "@/components/Nav";
import { useState, useCallback, useEffect, useReducer } from "react";
import Editor from "@/components/markdowneditor/Editor";
import Preview from "@/components/markdowneditor/Preview";
import AuthCheck from "@/components/AuthCheck";
import Loading from "@/components/Loading";
const initialState = {
  tags: [],
  content: "",
  loading: false,
  text: "",
  error: "",
  name: "",
  clicked: false,
};
function reducer(state: any, action: any) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: action.payload };
    case "error":
      return { ...state, error: action.payload };
    case "name":
      return { ...state, name: action.payload };
    case "content":
      return { ...state, content: action.payload };
    case "text":
      return { ...state, text: action.payload };
    case "click": {
      const include = state.tags.includes(action.payload);
      console.log(include);
      if (!include) return { ...state, tags: [...state.tags, action.payload] };
      else
        return {
          ...state,
          tags: state.tags.filter((el: string) => el != action.payload),
        };
    }
  }
}
function Page() {
  const [{ text, name, loading, content, error, tags }, dispatch] = useReducer(
    reducer,
    initialState
  );
  async function handleClick(plan: string) {
    const requestBody = { name, content, plan, tags };
    dispatch({ type: "loading", payload: true });
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    dispatch({ type: "loading", payload: false });
    if (data.status === "success") {
      dispatch({ type: "content", payload: "" });
      dispatch({ type: "text", payload: "" });
      dispatch({ type: "name", payload: "" });
      dispatch({ type: "error", payload: "" });
    } else {
      dispatch({ type: "error", payload: data.message });
    }
  }
  const handleDocChange = useCallback((newDoc: string) => {
    dispatch({ type: "content", payload: newDoc });
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
                onChange={(e) =>
                  dispatch({ type: "name", payload: e.target.value })
                }
              />
            </div>
            <h1 className="text-primary text-lg text-center py-2">{error}</h1>
            <h1 className={`text-primary text-3xl flex-0`}>Markdown Editor</h1>
            <div className="flex flex-1 w-full gap-4">
              <Editor initialDoc={text} onChange={handleDocChange} />
              <Preview doc={content} />
            </div>
          </main>
          <div className="border-primary border-2  flex flex-col space-y-[3vh] mx-auto px-[4vw] py-[4vh] items-center">
            <h1 className="text-accent text-3xl pb-[3vh]">Add Tags</h1>
            <div className="flex  space-x-[2vw] justify-center">
              <button
                className={`rounded-xl px-[2vw] py-[1vh] text-xl ${
                  !tags.includes("Technology")
                    ? "bg-black border-2 border-primary text-primary"
                    : "bg-primary border-black text-black"
                }`}
                onClick={() => {
                  dispatch({ type: "click", payload: "Technology" });
                }}
              >
                Technology ⚙️
              </button>
              <button
                className={` rounded-xl px-[2vw] py-[1vh] text-xl ${
                  !tags.includes("General")
                    ? "bg-black border-2 border-green-600 text-green-600"
                    : "bg-green-600 border-black text-black"
                }`}
                onClick={() => {
                  dispatch({ type: "click", payload: "General" });
                }}
              >
                General 👤
              </button>
              <button
                className={` rounded-xl px-[2vw] py-[1vh] text-xl ${
                  !tags.includes("Sports")
                    ? "bg-black border-2 border-accent text-accent"
                    : "bg-accent border-black text-black"
                }`}
                onClick={() => {
                  dispatch({ type: "click", payload: "Sports" });
                }}
              >
                Sports 🏏
              </button>
            </div>
            <div className="flex  space-x-[2vw] justify-center">
              <button
                className={` rounded-xl px-[2vw] py-[1vh] text-xl ${
                  !tags.includes("Education")
                    ? "bg-black border-2 border-blue-600 text-blue-600"
                    : "bg-blue-600 border-black text-black"
                }`}
                onClick={() => {
                  dispatch({ type: "click", payload: "Education" });
                }}
              >
                Education 📖
              </button>

              <button
                className={` rounded-xl px-[2vw] py-[1vh] text-xl ${
                  !tags.includes("Politics")
                    ? "bg-black border-2 border-yellow-400 text-yellow-400"
                    : "bg-yellow-400 border-black text-black"
                }`}
                onClick={() => {
                  dispatch({ type: "click", payload: "Politics" });
                }}
              >
                Politics 📢
              </button>
            </div>
          </div>
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
