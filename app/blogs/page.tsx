"use client";
import AuthCheck from "@/components/AuthCheck";
import BlogsTab from "@/components/BlogCard";
import ComponentLoading from "@/components/ComponentLoading";
import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import SearchNav from "@/components/SearchNav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("s");
  useEffect(
    function () {
      async function getAllBlogs() {
        setLoading(true);
        setError("");
        const requestBody = { search };
        const res = await fetch("/api/blogs", {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(requestBody),
        });
        const resData = await res.json();

        if (resData.status === "success") {
          setLoading(false);
          setData(resData.blogs);
        } else setError(resData.message);
        console.log(resData);
      }
      getAllBlogs();
    },
    [search]
  );

  return (
    <AuthCheck>
      <div
        className={`${
          data.length <= 8 ? "h-screen" : "h-full"
        } min-h-screen bg-black opacity-[85%] flex flex-col space-y-4`}
      >
        <SearchNav search={search} setSearch={setSearch} border={true} />
        <h1 className="text-primary text-lg text-center">{error}</h1>
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
