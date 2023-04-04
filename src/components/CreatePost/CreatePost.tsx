import { enLocale } from "public/locales";
import Avatar from "~/components/Avatar";
import { type UserResource } from "@clerk/types";
import Skeleton from "~/components/CreatePost/Skeleton";

const CreatePost = ({
  user,
  isLoaded,
  isSignedIn,
}: {
  user?: UserResource | null;
  isLoaded: boolean;
  isSignedIn?: boolean;
}) => (
  <div className="flex flex-col border-b border-slate-400 p-4">
    {isLoaded ? (
      isSignedIn && user ? (
        <div className="flex gap-4">
          <Avatar profileImageUrl={user.profileImageUrl} />
          <input
            placeholder={enLocale["create-post"].input.placeholder}
            className="grow bg-transparent outline-none"
          />
        </div>
      ) : (
        <div className="flex min-h-[56px] items-center justify-center">
          {enLocale["create-post"]["sign-in"]}
        </div>
      )
    ) : (
      <Skeleton />
    )}
  </div>
);

export default CreatePost;
