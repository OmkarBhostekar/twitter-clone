import React from "react";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import {
  HomeIcon,
  HashtagIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import {
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {};

const Sidebar = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:width-[340px] fixed p-2 h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="/icons/twitter.svg" width={30} height={30} alt="" />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarItem
          onClick={() => router.push("/")}
          title="Home"
          Icon={HomeIcon}
        />
        <SidebarItem
          onClick={() => router.push("/explore")}
          title="Explore"
          Icon={HashtagIcon}
        />
        <SidebarItem onClick={() => {}} title="Notifications" Icon={BellIcon} />
        <SidebarItem onClick={() => {}} title="Messages" Icon={InboxIcon} />
        <SidebarItem onClick={() => {}} title="Bookmarks" Icon={BookmarkIcon} />
        <SidebarItem onClick={() => {}} title="Lists" Icon={ClipboardIcon} />
        <SidebarItem onClick={() => {}} title="Profile" Icon={UserIcon} />
        <SidebarItem
          onClick={() => {}}
          title="More"
          Icon={EllipsisHorizontalCircleIcon}
        />
      </div>
      <button className=" hidden xl:inline ml-auto bg-green-600 text-white rounded-full w-44 h-[52px] text-lg font-bold shadow-md hover:bg-green-700">
        Tweet
      </button>
      <div
        className="flex items-center justify-center hoverAnimation xl:mx-auto xl:-mr-5 mt-auto"
        // @ts-ignore
        onClick={signOut}
      >
        <img
          // @ts-ignore
          src={session?.user?.image}
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="text-[#d9d9d9] text-bold">{session?.user?.name}</h4>
          <p className="text-[#6e767d]">
            @
            {
              // @ts-ignore
              session?.user?.tag
            }
          </p>
        </div>
        <EllipsisHorizontalIcon className="h-6 hidden xl:inline ml-4 text-[#d9d9d9]" />
      </div>
    </div>
  );
};

export default Sidebar;
