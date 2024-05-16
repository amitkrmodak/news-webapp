"use client";
import axios from "axios";
import { useState, useEffect, useLayoutEffect } from "react";
import StoryView from "@/components/StoryView";
import SideBar from "@/components/Sidebar";

export default function Home() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetchData = async (offset: number) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/newstories?`, {
        params: {
          offset: offset,
          limit,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setData(response.data.data.stories);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchData(offset);
  }, []);

  const fetchMore = async () => {
    console.log("fetch moreeeeeeeeeeeeee")
    setOffset(offset + limit);
    await fetchData(offset + limit);
  };

  return (
    <main className="flex justify-center pt-3 h-screen">
      <div className="flex items-center justify-center w-2/6 h-full pl-auto">
        <SideBar />
      </div>

      <div className="w-4/6 mt-5">
        <div className="bg-white w-fit">
          <h1 className="text-4xl font-bold inline-block border-b-8 border-red-500">
            New Stories
          </h1>
        </div>
        {loading ? (
          <h2 className="text-center mt-9">Loading...</h2>
        ) : (
          <StoryView fetchMore={fetchMore} data={data} />
        )}
      </div>
    </main>
  );
}
