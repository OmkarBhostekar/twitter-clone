import {
  CalendarIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { User } from "../types/User";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Props = {
  user: User;
  onFollow: (follow: boolean) => void;
};

const ProfileInfo = (props: Props) => {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState<Boolean>(
    props.user.isFollowed
  );
  return (
    <div className="w-ful pb-2">
      <div className="flex flex-col">
        <div className="flex items-center justify-center h-48">
          <img
            // @ts-ignore
            src={props.user.cover}
            className="h-48 w-full object-cover bg-[#323638] "
          />
        </div>
        <div className="-mt-16 flex flex-col mx-4">
          <div className="flex flex-row items-end justify-between">
            <img
              // @ts-ignore
              src={props.user.avatar}
              alt="profile image"
              className="h-36 w-36 rounded-full border-4 border-black"
            />
            <div className="flex flex-row mb-6">
              <div className="h-10 w-10 border-[.5px] bg-black border-white rounded-full mr-3">
                <EllipsisHorizontalIcon className="h-6 text-white mx-auto mt-2" />
              </div>
              {
                // @ts-ignore
                session.user.id === props.user.id ? (
                  <button
                    className="bg-black text-white border-[.5px] border-white rounded-full font-bold text-sm py-2 px-4"
                    onClick={() => {}}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    className={
                      isFollowing
                        ? ` bg-black text-white border-[.5px] border-white rounded-full font-bold text-sm py-2 px-4`
                        : ` bg-white text-black rounded-full font-bold text-sm py-2 px-4`
                    }
                    onClick={() => {
                      setIsFollowing(!isFollowing);
                      props.onFollow(!isFollowing);
                    }}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )
              }
            </div>
          </div>
          <div className="flex flex-row items-center mt-4">
            <div className="text-white font-bold text-lg">
              {props.user.name}
            </div>
            {props.user.verified && (
              <Image
                src="/icons/verified.svg"
                width={18}
                height={18}
                objectFit="contain"
                alt={""}
                className="ml-2"
              />
            )}
          </div>
          <div className="text-gray-500">@{props.user.username}</div>
          <div className="text-white mt-2">{props.user.bio}</div>
          <div className="flex flex-row">
            <MapPinIcon className="h-4 text-gray-500 mt-3 -ml-1" />
            <div className="text-gray-500 mt-2 ml-1">Mumbai, India</div>
            <CalendarIcon className="h-4 text-gray-500 mt-3 ml-6" />
            <div className="text-gray-500 mt-2 ml-1">Joined December 2022</div>
          </div>
          <div className="flex flex-row mt-2">
            <div className="cursor-pointer flex flex-row">
              <div className="text-white text-bold ">
                {props.user._count.following}
              </div>
              <div className="text-gray-500 ml-1 mr-2 hover:underline">
                Following
              </div>
            </div>
            <div className="flex flex-row cursor-pointer ">
              <div className="text-white text-bold">
                {props.user._count.followedBy}
              </div>
              <div className="text-gray-500 ml-1 mr-2 hover:underline">
                Followers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
