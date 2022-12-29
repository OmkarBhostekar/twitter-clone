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
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProfileInfo from "../../components/ProfileInfo";
import Sidebar from "../../components/Sidebar";
import TweetDetailModal from "../../components/TweetDetailModal";
import Widgets from "../../components/Widgets";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modelAtoms";
import Tweet from "../../components/Tweet";
import { BuiltInProviderType } from "next-auth/providers";

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

const HashTag = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { hid } = router.query;
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  const fetchHashtagTweets = async () => {
    if (hid) {
      const res = await fetch(
        // @ts-ignore
        `/api/tweet/hashtag?hashtag=${hid}&userId=${session?.user.id}`
      ).then((res) => res.json());
      setTweets(res);
    }
  };

  useEffect(() => {
    fetchHashtagTweets();
  }, [hid]);

  return (
    <div className="">
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">#{hid}</span>
            </div>
          </div>

          {tweets.map((tweet) => (
            // @ts-ignore
            <Tweet key={tweet.id} tweet={tweet} tweetDetailPage={false} />
          ))}
        </div>
        <Widgets
          followVisible={true}
          searchVisible={true}
          trendingVsible={true}
        />

        {isOpen && <TweetDetailModal />}
      </main>
    </div>
  );
};

export default HashTag;

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
