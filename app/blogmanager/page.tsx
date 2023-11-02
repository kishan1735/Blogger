"use client";
import AuthCheck from "@/components/AuthCheck";
import BlogsTab from "@/components/BlogCard";
import ComponentLoading from "@/components/ComponentLoading";
import SearchNav from "@/components/SearchNav";
import Blog from "@/models/blogModel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("s");

  useEffect(function () {
    async function getYourBlogs() {
      setLoading(true);
      setError("");
      const res = await fetch("/api/blogmanager", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      const resData = await res.json();
      console.log(resData);
      if (resData.status === "success") {
        setLoading(false);
        setData(resData.blogs);
      } else setError(resData.message);
      console.log(resData);
    }
    getYourBlogs();
  }, []);

  return (
    <AuthCheck>
      <Nav />
      <div
        className={`${
          data.length <= 8 ? "h-screen" : "h-full"
        } min-h-screen bg-black opacity-[85%] flex flex-col space-y-4`}
      >
        <h1 className="text-primary text-lg text-center">{error}</h1>
        <h1 className="text-primary text-lg text-center"> Your blogs </h1>
        <div className="grid grid-cols-4 gap-4 p-2">
          {loading ? (
            <ComponentLoading />
          ) : (
            <BlogsTab data={data} router={router}></BlogsTab>
          )}
        </div>
      </div>
    </AuthCheck>
  );
}

export default Page;
