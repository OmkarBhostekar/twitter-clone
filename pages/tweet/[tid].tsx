import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Head from "next/head";
import { Tweet as TweetType } from "../../types/Tweet";
import Tweet from "../../components/Tweet";
import { modalState } from "../../atoms/modelAtoms";
import { BuiltInProviderType } from "next-auth/providers";
import Login from "../../components/Login";
import Sidebar from "../../components/Sidebar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import TweetDetailModal from "../../components/TweetDetailModal";
import Comment from "../../components/Comment";
import { feedState } from "../../atoms/feedAtoms";
import { Follow, Trending } from "../../types/others";
import Widgets from "../../components/Widgets";
import { trendingState } from "../../atoms/widgetsAtoms";

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  // session: Session | null;
}

function PostPage(props: Props) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [tweet, setTweet] = useState<TweetType>();
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useRecoilState(feedState);
  const router = useRouter();
  const { tid } = router.query;

  const fetchTweet = async () => {
    if (tid) {
      // @ts-ignore
      fetch(`/api/tweet/${tid}?userId=${session?.user.id}`)
        .then((res) => res.json())
        .then((data) => setTweet(data));
    }
  };

  useEffect(() => {
    // fetch tweet detail
    console.log(tid);
    fetchTweet();
  }, []);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
      fetchTweet();
    }
  }, [refresh]);

  if (!session) return <Login providers={props.providers} />;

  return (
    <div>
      <Head>
        <title>
          {tweet?.author.name} on Twitter: {tweet?.content}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            Tweet
          </div>
          {tweet && (
            <Tweet
              id={tweet?.id}
              tweet={tweet}
              key={tweet?.id}
              tweetDetailPage
            />
          )}

          {tweet?.comments && tweet?.comments?.length > 0 && (
            <div className="pb-72">
              {tweet?.comments.map((comment) => (
                // @ts-ignore
                <Comment key={comment.id} id={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
        <Widgets />

        {isOpen && <TweetDetailModal />}
      </main>
    </div>
  );
}

export default PostPage;

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
