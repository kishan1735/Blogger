"use client";
import AuthCheck from "@/components/AuthCheck";
import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import Preview from "@/components/markdowneditor/Preview";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const [blog, setBlog] = useState<any>();
  const [user, setUser] = useState<any>();
  const [purchased, setPurchased] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [author, setAuthor] = useState<any>();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        if (data.status === "success") {
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
  async function handlePay() {
    setError("");
    setLoading(true);
    const res = await fetch(`/api/blogs/${params.blog}/pay`, {
      headers: { "Content-type": "application/json" },
    });
    setLoading(false);
    const data = await res.json();
    if (data?.status == "success") {
      setPurchased(true);
    } else {
      setError(data.message);
    }
  }
  console.log(purchased);
  return (
    <AuthCheck>
      {loading ? (
        <Loading />
      ) : (
        <div
          className={`bg-black opacity-[85%] ${
            purchased ? "h-full" : "h-screen"
          }  min-h-screen pb-4 flex flex-col items-center w-screen`}
        >
          <Nav />
          <div className="border-t-2 w-screen border-primary mb-4"></div>
          {purchased ? (
            <div className="bg-black py-8 px-16 flex flex-col items-center space-y-4 w-[50vw] mx-28">
              <h1 className="text-primary text-4xl">{blog?.name}</h1>
              <h2 className="text-secondary">
                {new Date(blog?.time).toDateString() +
                  new Date(blog?.time).toTimeString()}
              </h2>
              <h2 className="text-primary text-2xl">- {author?.name}</h2>
              <h1 className="text-primary text-lg text-center">{error}</h1>
              <Preview doc={blog?.content}></Preview>
            </div>
          ) : (
            <div className="border-2 border-primary mt-[12vh] px-[10vw] py-[6vh] text-center flex flex-col space-y-[2vh] items-center">
              <h1 className="text-accent uppercase text-3xl pb-[2vh]">
                Purchase the Article to View
              </h1>
              <h1 className="text-green-600 text-2xl">{blog?.name}</h1>
              <h1 className="text-secondary text-xl pb-[3vh]">
                Purchase the article at just ₹2 to continue reading
              </h1>

              {proceed ? (
                <button
                  className="bg-primary border-black border-2 hover:bg-black hover:border-primary hover:text-primary py-[2vh] text-2xl w-[30vw]"
                  onClick={handlePay}
                >
                  Pay
                </button>
              ) : (
                <button
                  className="bg-primary border-black border-2 hover:bg-black hover:border-primary hover:text-primary py-[2vh] text-2xl w-[30vw]"
                  onClick={() => {
                    setProceed(true);
                  }}
                >
                  Proceed
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </AuthCheck>
  );
}

export default Page;
