import { type NextPage } from "next";
import Head from "next/head";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";
import CreatePost from "~/components/CreatePost";
import PostView from "~/components/PostView";

const Home: NextPage = () => {
  const user = useUser();
  const { data, isLoading } = api.post.getAll.useQuery();

  return (
    <>
      <Head>
        <title>t3 test</title>
        <meta name="description" content="t3 test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex flex-col justify-center border-b border-slate-400 p-4 ">
            {!user.isSignedIn ? (
              <SignInButton />
            ) : (
              <>
                <SignOutButton />
                <CreatePost />
              </>
            )}
          </div>
          <div className="flex flex-col">
            {!!data
              ? data.map(({ post, author }) => (
                  <PostView post={post} author={author} key={post.id} />
                ))
              : isLoading
              ? "Loading tRPC query..."
              : "Error loading data"}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
