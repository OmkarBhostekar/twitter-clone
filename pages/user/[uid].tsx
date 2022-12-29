import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "../../types/User";
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  useSession,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import TweetDetailModal from "../../components/TweetDetailModal";
import { modalState } from "../../atoms/modelAtoms";
import { useRecoilState } from "recoil";
import Sidebar from "../../components/Sidebar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Widgets from "../../components/Widgets";
import ProfileInfo from "../../components/ProfileInfo";
import { Tweet as TweetType } from "../../types/Tweet";
import Tweet from "../../components/Tweet";

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

const Profile = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { uid } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [userTweets, setUserTweets] = useState<TweetType[]>([]);

  const fetchUser = async () => {
    if (uid) {
      const res = await fetch(
        // @ts-ignore
        `/api/user/${uid}?userId=${session?.user.id}`
      ).then((res) => res.json());
      setUser(res);
    }
    console.log(user);
  };

  const fetchUserTweets = async () => {
    if (uid) {
      const res = await fetch(
        // @ts-ignore
        `/api/tweet?uid=${uid}&userId=${session?.user.id}`
      ).then((res) => res.json());
      setUserTweets(res);
    }
    console.log(userTweets);
  };

  useEffect(() => {
    fetchUser();
    fetchUserTweets();
  }, []);

  const onFollowClickListener = async (isFollow: boolean) => {
    if (!user) return;
    const res = await fetch(`/api/user/${user.id}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // @ts-ignore
        userId: session?.user.id,
        isFollow: isFollow,
      }),
    }).then((res) => res.json());
    await fetchUser();
  };

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
              <span className="text-base font-semibold">{user?.name}</span>
              <span className="text-sm text-gray-500">
                {user && `${user._count.tweets} Tweets`}
              </span>
            </div>
          </div>
          {user && <ProfileInfo user={user} onFollow={onFollowClickListener} />}
          <div className="flex flex-row border-b border-gray-700">
            <div className="flex flex-col w-1/4 items-center justify-center hover:bg-opacity-10 cursor-pointer transition duration-200 ease-out hover:bg-[#d9d9d9] pt-3">
              <div className="text-white">Tweets</div>
              <div className="bg-green-600 h-[5px] w-8 mt-2 rounded-full "></div>
            </div>
          </div>

          {userTweets.map((tweet) => (
            // @ts-ignore
            <Tweet key={tweet.id} tweet={tweet} tweetDetailPage={false} />
          ))}
        </div>
        <Widgets
          searchVisible={true}
          trendingVsible={true}
          followVisible={true}
        />

        {isOpen && <TweetDetailModal />}
      </main>
    </div>
  );
};

export default Profile;

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
