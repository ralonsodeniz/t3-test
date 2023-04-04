import { type NextPage } from "next";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";

import CreatePost from "~/components/CreatePost";
import SignIn from "~/components/SignIn";
import Feed from "~/components/Feed";

const Home: NextPage = () => {
  const { isSignedIn, isLoaded, user } = useUser();

  return (
    <>
      <Head>
        <title>t3 test</title>
        <meta name="description" content="t3 test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-screen mx-auto w-full border-x border-slate-400 md:max-w-2xl">
        <SignIn isLoaded={isLoaded} isSignedIn={isSignedIn} />
        <CreatePost isLoaded={isLoaded} isSignedIn={isSignedIn} user={user} />
        <Feed />
      </main>
    </>
  );
};

export default Home;
