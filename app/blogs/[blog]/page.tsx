"use client";
import Nav from "@/components/Nav";
import Preview from "@/components/markdowneditor/Preview";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const [blog, setBlog] = useState<any>();
  const [user, setUser] = useState<any>();
  const params = useParams();

  useEffect(
    function () {
      async function getBlog() {
        const res = await fetch(`/api/blogs/${params.blog}`, {
          headers: { "Content-type": "application/jsons" },
        });
        const data = await res.json();
        setBlog(data.blog);
        setUser(data.user);
      }
      getBlog();
    },
    [params.blog]
  );

  return (
    <div className="bg-secondary h-screen flex flex-col items-center space-y-4">
      <Nav />
      <div className="bg-black py-8 px-16 flex flex-col items-center space-y-2 mx-28">
        <h1 className="text-secondary text-xl">{blog?.name}</h1>
        <h2 className="text-accent">
          {Date(blog?.time).toString().split("GMT")[0]}
        </h2>
        <h2 className="text-secondary">- {user?.name}</h2>
        <Preview doc={blog?.content}></Preview>
      </div>
    </div>
  );
}

export default Page;
