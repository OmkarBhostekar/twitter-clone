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

const Home = (props: Props) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

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
          searchVisible={true}
          trendingVsible={true}
          followVisible={true}
        />

        {isOpen && <TweetDetailModal />}
      </main>
    </div>
  );
};

export default Home;

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
