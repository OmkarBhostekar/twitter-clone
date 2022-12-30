import React, { useState } from "react";
import {
  ChartBarIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalCircleIcon,
  HeartIcon,
  ShareIcon,
  ArrowPathIcon,
  TrashIcon,
  ArrowPathRoundedSquareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatBubbleLeftIcon as ChatIconFilled,
} from "@heroicons/react/24/solid";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState, tweetIdState } from "../atoms/modelAtoms";
import { useRouter } from "next/router";
import { Tweet } from "../types/Tweet";

type Props = {
  id: number;
  tweet: Tweet;
  key: number;
  tweetDetailPage: boolean;
};

const Tweet = (props: Props) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [tweetId, setTweetId] = useRecoilState(tweetIdState);
  const [liked, setLiked] = useState<boolean>(props.tweet.likes.length > 0);
  const [likes, setLikes] = useState<number>(props.tweet._count.likes);
  const [comments, setComments] = useState<number>(props.tweet._count.comments);
  const router = useRouter();

  const text = props.tweet.content?.split(" ");
  const hashTaggedText = text?.map((word) => {
    if (word.startsWith("#")) {
      return (
        <span
          className="text-green-500 hover:underline"
          key={word}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/explore/${word.slice(1)}`);
          }}
        >
          {word}{" "}
        </span>
      );
    } else return word + " ";
  });

  const likePost = async () => {
    if (!session) return;
    setLiked(!liked);
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    const res = await fetch("/api/tweet/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tweetId: props.tweet.id,
        // @ts-ignore
        userId: session.user.id,
      }),
    });
    console.log(res);
  };

  return (
    <div
      className="p-3 flex cursor-pointer border-b border-gray-700"
      onClick={() => router.push(`/tweet/${props.id}`)}
    >
      {!props.tweetDetailPage && (
        <img
          src={props.tweet.author.avatar}
          alt=""
          className="h-11 w-11 rounded-full mr-4"
        />
      )}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!props.tweetDetailPage && "justify-between"}`}>
          {props.tweetDetailPage && (
            <img
              src={props.tweet.author.avatar}
              alt="Profile Pic"
              className="h-11 w-11 rounded-full mr-4"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className={`font-bold text-lg sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !props.tweetDetailPage && "inline-block"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/user/${props.tweet.author.id}`);
                }}
              >
                {props.tweet.author.name}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${
                  !props.tweetDetailPage && "ml-1.5"
                }`}
              >
                @{props.tweet.author.username}
              </span>
            </div>
            {"  "}·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>
                {new Date(props.tweet?.createdAt as string)}
              </Moment>
            </span>
            {!props.tweetDetailPage && (
              <p className="text-[#d9d9d9] text-lg sm:text-base mt-0.5">
                {hashTaggedText}
              </p>
            )}
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-green-500" />
          </div>
        </div>
        {props.tweetDetailPage && (
          <p className="text-[#d9d9d9] mt-0.5 text-xl">{hashTaggedText}</p>
        )}
        <img
          src={props?.tweet?.image ?? ""}
          alt=""
          className="rounded-2xl max-h-[700px] object-cover mr-2"
        />
        <div
          className={`text-[#6e767d] flex justify-between w-10/12 ${
            props.tweetDetailPage && "mx-auto"
          }`}
        >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              setTweetId(props.tweet);
              setIsOpen(true);
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatBubbleLeftIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {props.tweet._count.comments > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {props.tweet._count.comments}
              </span>
            )}
          </div>

          {
            // @ts-ignore
            session?.user?.id === props.tweet.author.id ? (
              <div
                className="flex items-center space-x-1 group"
                onClick={(e) => {
                  e.stopPropagation();
                  // deleteDoc(doc(db, "posts", id));
                  // router.push("/");
                }}
              >
                <div className="icon group-hover:bg-red-600/10">
                  <TrashIcon className="h-5 group-hover:text-red-600" />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-1 group">
                <div className="icon group-hover:bg-green-500/10">
                  <ArrowPathRoundedSquareIcon className="h-5 group-hover:text-green-500" />
                </div>
              </div>
            )
          }

          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes}
              </span>
            )}
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
