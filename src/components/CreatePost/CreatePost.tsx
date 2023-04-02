import { useUser } from "@clerk/nextjs";
import { enLocale } from "public/locales";
import Avatar from "~/components/Avatar";

const CreatePost = () => {
  const { user } = useUser();

  return user ? (
    <div className="flex gap-4">
      <Avatar profileImageUrl={user.profileImageUrl} />
      <input
        placeholder={enLocale["create-post"].input.placeholder}
        className="grow bg-transparent outline-none"
      />
    </div>
  ) : null;
};

export default CreatePost;
