import { SparklesIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Input from "./Input";
import { Tweet as TweeetType } from "../types/Tweet";
import Tweet from "./Tweet";
import { useRecoilState } from "recoil";
import { feedState } from "../atoms/feedAtoms";

type Props = {};

const Feed = (props: Props) => {
  const [tweets, setTweets] = useState<TweeetType[]>([]);
  const { data: session } = useSession();
  const [refresh, setRefresh] = useRecoilState(feedState);

  const fetchTweets = async () => {
    // @ts-ignore
    const res = await fetch(`/api/tweet?userId=${session?.user?.id ?? ""}}`);
    const newTweets = await res.json();
    setTweets(newTweets);
    console.log("newTweets", newTweets);
  };

  React.useEffect(() => {
    fetchTweets();
  }, []);

  React.useEffect(() => {
    if (refresh) {
      fetchTweets();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <div className="text-white flex-grow max-w-2xl ml-0 sm:ml-[75px] border-l border-r border-gray-700 xl:ml-[370px]">
      <div className="flex items-center text-[#d9d9d9] sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 items-center justify-center flex xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>
      <Input />
      <div className="pb-72">
        {tweets.map((tweet: Tweet) => (
          <Tweet
            key={tweet.id}
            id={tweet.id}
            tweet={tweet}
            tweetDetailPage={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
