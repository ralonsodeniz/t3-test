import { enLocale } from "public/locales";
import Avatar from "~/components/Avatar";
import { type UserResource } from "@clerk/types";
import Skeleton from "~/components/CreatePost/Skeleton";
import { api } from "~/utils/api";
import { type KeyboardEventHandler, useRef } from "react";

const CreatePost = ({
  user,
  isLoaded,
  isSignedIn,
}: {
  user?: UserResource | null;
  isLoaded: boolean;
  isSignedIn?: boolean;
}) => {
  const context = api.useContext();
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      if (ref.current) ref.current.value = "";
      void context.post.getAll.invalidate();
    },
  });
  const ref = useRef<HTMLInputElement>(null);
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" && ref.current) {
      mutate({ content: ref.current.value });
    }
  };

  return (
    <div className="flex flex-col border-b border-slate-400 p-4">
      {isLoaded ? (
        isSignedIn && user ? (
          <div className="flex gap-4">
            <Avatar profileImageUrl={user.profileImageUrl} />
            <input
              placeholder={enLocale["create-post"].input.placeholder}
              className="grow bg-transparent outline-none"
              onKeyDown={handleKeyDown}
              type="text"
              ref={ref}
              disabled={isPosting}
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
};

export default CreatePost;
