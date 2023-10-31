"use client";
import Nav from "@/components/Nav";
import SearchNav from "@/components/SearchNav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(
    function () {
      async function getAllBlogs() {
        const requestBody = { search };
        const res = await fetch("/api/blogs", {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(requestBody),
        });
        const resData = await res.json();
        setData(resData.blogs);
      }
      getAllBlogs();
    },
    [search]
  );
  return (
    <div className="h-screen bg-secondary flex flex-col space-y-4">
      <SearchNav search={search} setSearch={setSearch} />
      <div className="grid grid-cols-4 gap-4 p-2">
        {data?.map((el: any) => {
          return (
            <div
              className="bg-black px-2 py-4 flex flex-col space-y-2 hover:scale-105 cursor-pointer"
              key={el._id}
              onClick={() => {
                router.push(`/blogs/${el._id}`);
              }}
            >
              <h1 className="text-primary text-xl text-center">{el.name}</h1>
              <h1 className="text-accent text-sm text-center">
                {el.time.toString().split("G")[0]}
              </h1>
              <h1 className="text-secondary text-sm text-center">
                {el.content.substring(0, 80)}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
