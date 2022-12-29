import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/router";
import { Tweet as TweetType } from "../../types/Tweet";
import React, { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ProfileInfo from "../../components/ProfileInfo";
import Sidebar from "../../components/Sidebar";
import TweetDetailModal from "../../components/TweetDetailModal";
import Widgets from "../../components/Widgets";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modelAtoms";
import Tweet from "../../components/Tweet";
import { BuiltInProviderType } from "next-auth/providers";
import { HashTag } from "../../types/HashTag";

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

const Explore = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [tags, setTags] = useState<HashTag[]>([]);

  const fetchHashtagTweets = async () => {
    const res = await fetch(
      // @ts-ignore
      `/api/hashtags`
    ).then((res) => res.json());
    setTags(res);
  };

  useEffect(() => {
    fetchHashtagTweets();
  }, []);

  return (
    <div className="">
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="sticky top-0 py-1.5 bg-black z-50 w-11/12 mx-auto mt-3 mb-2">
            <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
              <MagnifyingGlassIcon className="text-gray-500 h-5 z-50" />
              <input
                type="text"
                className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-green-600 rounded-full focus:bg-black focus:shadow-lg"
                placeholder="Search Twitter"
              />
            </div>
          </div>

          {tags &&
            tags.map((tag) => (
              // @ts-ignore
              <div
                key={tag.id}
                className="flex flex-row justify-between py-3 px-6 cursor-pointer transition duration-200 ease-out hover:bg-[#d9d9d9] hover:bg-opacity-5"
                onClick={() => router.push(`/explore/${tag.name}`)}
              >
                <div className="flex flex-col">
                  <div className="text-md text-green-500 capitalize">
                    #{tag.name}
                  </div>
                  <div className="text-base text-gray-700">
                    {tag._count.tweets} Tweets
                  </div>
                </div>
                <div className="icon group flex-shrink-0 ml-auto">
                  <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-green-500" />
                </div>
              </div>
            ))}
        </div>
        <Widgets
          searchVisible={false}
          trendingVsible={false}
          followVisible={true}
        />

        {isOpen && <TweetDetailModal />}
      </main>
    </div>
  );
};

export default Explore;

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}
