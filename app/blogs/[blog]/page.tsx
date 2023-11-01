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
    <div className="bg-black opacity-80 h-full pb-4 flex flex-col items-center space-y-4 w-screen">
      <Nav />
      <div className="border-t-2 w-screen border-primary"></div>
      <div className="bg-black py-8 px-16 flex flex-col items-center space-y-4 w-[50vw] mx-28">
        <h1 className="text-primary text-3xl">{blog?.name}</h1>
        <h2 className="text-secondary">
          {Date(blog?.time).toString().split("GMT")[0]}
        </h2>
        <h2 className="text-primary">- {user?.name}</h2>
        <Preview doc={blog?.content}></Preview>
      </div>
    </div>
  );
}

export default Page;
