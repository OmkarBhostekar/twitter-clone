import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Login from "../components/Login";
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  useSession,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { Session } from "next-auth";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modelAtoms";
import TweetDetailModal from "../components/TweetDetailModal";
import { Follow, Trending } from "../types/others";
import Widgets from "../components/Widgets";
import { trendingState, followState } from "../atoms/widgetsAtoms";
import { useEffect } from "react";

interface Props {
  trendingResults: [Trending];
  followResults: [Follow];
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  // session: Session | null;
}

export default function Home(props: Props) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [trending, setTrending] = useRecoilState(trendingState);
  const [follow, setFollow] = useRecoilState(followState);

  useEffect(() => {
    setTrending(props.trendingResults);
    setFollow(props.followResults);
  }, []);

  if (!session) return <Login providers={props.providers} />;

  return (
    <div className="">
      <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen  flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />

        <Widgets
          trendingResults={props.trendingResults}
          followResults={props.followResults}
        />

        {isOpen && <TweetDetailModal />}
      </main>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://www.jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  console.log("trendingResults", trendingResults);
  console.log("followResults", followResults);

  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
