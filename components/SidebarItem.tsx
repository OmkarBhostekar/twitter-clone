import React from "react";
import Image from "next/image";

type Props = {
  title: String;
  Icon: any;
  active?: Boolean;
};

const SidebarItem = (props: Props) => {
  return (
    <div
      className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${
        props.active && "font-bold"
      }`}
    >
      <props.Icon className="h-7 text-[#d9d9d9]" />
      <span className="hidden xl:inline text-[#d9d9d9]">{props.title}</span>
    </div>
  );
};

export default SidebarItem;
