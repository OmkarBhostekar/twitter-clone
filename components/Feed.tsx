import { SparklesIcon } from "@heroicons/react/24/outline";
import React from "react";
import Input from "./Input";

type Props = {};

const Feed = (props: Props) => {
  return (
    <div className="text-white flex-grow max-w-2xl ml-0 sm:ml-[75px] border-l border-r border-gray-700 xl:ml-[370px]">
      <div className="flex items-center text-[#d9d9d9] sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 items-center justify-center flex xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>
      <Input />
    </div>
  );
};

export default Feed;
