import StoryCard from "@/components/StoryCard";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const StoryView = ({ fetchMore, data }: any) => {
  const [displayedIdList, setDisplayedIdList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    if (data.length === 0) {
      setHasMore(false);
    }
    const temp = data.filter((item: any) => {
      // @ts-ignore
      if (displayedIdList.includes(item.id)) {
        return false;
      }
      // @ts-ignore
      setDisplayedIdList((prev) => [...prev, item.id]);
      return true;
    });
    // @ts-ignore
    setFinalData((prev) => [...prev, ...temp]);
  }, [data]);
  return (
    <div
      className="h-[80vh] w-full mt-9 overflow-auto no-scrollbar"
      id="scrollableDiv"
    >
      <InfiniteScroll
        next={fetchMore}
        hasMore={hasMore}
        loader={<div className="h4 w-3/4 text-center">Loading...</div>}
        endMessage={<div className="h4 w-3/4 text-center">You have seen all stories</div>}
        dataLength={finalData.length}
        className="h-[80vh]"
        scrollableTarget="scrollableDiv"
      >
        {finalData.map((item: any) => (
          <StoryCard key={item.id} data={item} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default StoryView;
