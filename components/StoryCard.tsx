import React from "react";
import { LiaComment } from "react-icons/lia";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

const StoryCard = ({ ...props }) => {
  const getHours = (time: number) => {
    const currentTimeMillis = Date.now();
    const givenTimestampMillis = time * 1000;
    const hourDifference = Math.abs(
      Math.floor((currentTimeMillis - givenTimestampMillis) / (1000 * 60 * 60))
    );
    return `${hourDifference} hours ago`;
  };

  const { title, by, time, score, descendants, url } = props.data;

  const openLink = () => {
    window.open(url, "_blank");
  };

  return (
    <div
      className="w-3/4 my-3 p-6 flex bg-[#FCFBF4] border border-gray-200 rounded-lg shadow cursor-pointer "
      onClick={openLink}
    >
      <div className="mx-5">
        <span>
          {score > 0 ? (
            <TiArrowSortedUp size={30} color="#808080" />
          ) : (
            <TiArrowSortedDown size={30} color="#808080" />
          )}
        </span>
        <span className="ml-1">{score}</span>
      </div>
      <div className="ml-8 w-full pr-10">
        <h2 className="text-lg font-semibold truncate w-[90%] break-all whitespace-nowrap">
          {title}
        </h2>
        <div className="flex justify-between gap-2">
          {by && (
            <p className="text-sm text-gray-600 w-3/12">
              by{" "}
              <span className="font-semibold text-red-500 truncate break-all whitespace-nowrap ">
                {by}
              </span>
            </p>
          )}
          {time && <p className="text-sm w-2/12">{getHours(time)}</p>}
          {url && (
            <p className="truncate text-sm break-all whitespace-nowrap w-5/12">
              {url.split("://")[1]}
            </p>
          )}
          <div className="flex w-2/12">
            <LiaComment size={18} />
            {descendants && (
              <p className="text-sm text-gray-600 ml-2">{descendants}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;