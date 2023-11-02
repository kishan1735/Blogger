"use client";
import AuthCheck from "@/components/AuthCheck";
import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import Preview from "@/components/markdowneditor/Preview";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>();
  const [user, setUser] = useState<any>();
  const [purchased, setPurchased] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [author, setAuthor] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [owner, setOwner] = useState(false);

  useEffect(
    function () {
      async function getBlog() {
        setError("");
        setLoading(true);
        const res = await fetch(`/api/blogs/${params.blog}`, {
          headers: { "Content-type": "application/jsons" },
        });
        const data = await res.json();
        setLoading(false);
        console.log(data);
        if (data.status === "success") {
          console.log(data.owner);
          if (data.owner) {
            setOwner(true);
          }
          if (data.purchased) {
            setPurchased(true);
          }
          setBlog(data.blog);
          setUser(data.user);
          setAuthor(data.author);
        } else {
          setError(data.message);
        }
      }
      getBlog();
    },
    [params.blog]
  );
  async function handleDelete() {
    const res = await fetch(`/api/blogs/${params.blog}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    if (data.status == "failed") {
      setError(data.message);
    } else {
      router.push(`/blogs`);
    }
  }
  console.log(owner, !owner);
  return (
    <AuthCheck>
      {loading || !owner ? (
        <Loading />
      ) : (
        <div
          className={`bg-black opacity-[85%] ${
            purchased ? "h-full" : "h-screen"
          }  min-h-screen pb-4 flex flex-col items-center w-screen`}
        >
          <Nav />
          <div className="border-t-2 w-screen border-primary mb-4"></div>
          <div className="bg-black py-8 px-16 flex flex-col items-center space-y-4 w-[50vw] mx-28">
            <h1 className="text-primary text-4xl">{blog?.name}</h1>
            <h2 className="text-secondary">
              {new Date(blog?.time).toDateString() +
                new Date(blog?.time).toTimeString()}
            </h2>
            <h2 className="text-primary text-2xl">- {author?.name}</h2>
            <h1 className="text-primary text-lg text-center">{error}</h1>
            <Preview doc={blog?.content}></Preview>

            <button
              className="bg-primary border-black border-2 hover:bg-black hover:border-primary hover:text-primary py-[2vh] text-2xl w-[30vw]"
              onClick={handleDelete}
            >
              Delete Blog
            </button>
          </div>
        </div>
      )}
    </AuthCheck>
  );
}

export default Page;
