import { type RouterOutputs } from "~/utils/api";
import { type FC } from "react";
import Avatar from "~/components/Avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// number tells TypeScript we just want an item from the array
type TPostWithUser = RouterOutputs["post"]["getAll"][number];
const PostView: FC<TPostWithUser> = ({ post, author }) => {
  const postDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(post.createdAt));
  const timeFromNow = dayjs(post.createdAt).fromNow();

  return (
    <div
      className="flex items-center gap-4 border-b border-slate-400 p-4"
      key={post.id}
    >
      <Avatar profileImageUrl={author.profileImageUrl} />
      <div className="flex flex-col overflow-hidden">
        <div className="flex text-slate-300 ">
          <span className="text-ellipsis after:mx-2 after:content-['·']">{`@${author.username}`}</span>
          <span className="hidden after:mx-2 after:content-['·'] md:block">
            {postDate}
          </span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {timeFromNow}
          </span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

export default PostView;
