"use client";
import AuthCheck from "@/components/AuthCheck";
import ComponentLoading from "@/components/ComponentLoading";
import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import SearchNav from "@/components/SearchNav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogsTab({ data, router }: { data: any; router: any }) {
  // console.log(data[0].tags);
  return (
    <>
      {data?.map((el: any) => {
        return (
          <div
            className="bg-black border-2 border-primary px-[2vh] py-[4vh] flex flex-col space-y-2 hover:scale-105 cursor-pointer"
            key={el._id}
            onClick={() => {
              router.push(`/blogs/${el._id}`);
            }}
          >
            <h1 className="text-primary text-xl text-center">{el.name}</h1>

            <h1 className="text-accent text-sm text-center">
              {new Date(el.time).toDateString() +
                " " +
                new Date(el.time).toTimeString().split("GMT")[0]}
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
            {/* <h1 className="text-secondary text-sm text-center">
              {el?.tabs?.length == 0
                ? ""
                : el.tabs.map((el: any) => {
                    return <div key={el}>{el}</div>;
                  })}
            </h1> */}
          </div>
        );
      })}
    </>
  );
}
