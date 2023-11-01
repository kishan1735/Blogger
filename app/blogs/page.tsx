"use client";
import AuthCheck from "@/components/AuthCheck";
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
        setLoading(false);
        if (resData.status === "success") setData(resData.blogs);
        else setError(resData.message);
      }
      getAllBlogs();
    },
    [search]
  );
  return (
    <AuthCheck>
      {loading ? (
        <Loading />
      ) : (
        <div
          className={`${
            data.length <= 8 ? "h-screen" : "h-full"
          } bg-black opacity-[85%] flex flex-col space-y-4`}
        >
          <SearchNav search={search} setSearch={setSearch} border={true} />

          <div className="grid grid-cols-4 gap-4 p-2">
            <h1 className="text-primary text-lg text-center">{error}</h1>
            {data?.map((el: any) => {
              return (
                <div
                  className="bg-black border-2 border-primary px-2 py-4 flex flex-col space-y-2 hover:scale-105 cursor-pointer"
                  key={el._id}
                  onClick={() => {
                    router.push(`/blogs/${el._id}`);
                  }}
                >
                  <h1 className="text-primary text-xl text-center">
                    {el.name}
                  </h1>

                  <h1 className="text-accent text-sm text-center">
                    {el.time.toString().split("G")[0]}
                  </h1>
                  <h1 className="text-secondary text-sm text-center">
                    {el.content.substring(0, 60)}
                  </h1>
                  <h1 className="text-lg text-center">
                    <p
                      className={`${
                        el.plan === "premium" ? "text-green-500" : "text-accent"
                      }`}
                    >
                      {el.plan == "premium" ? "premium" : "free"}
                    </p>
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AuthCheck>
  );
}

export default Page;
