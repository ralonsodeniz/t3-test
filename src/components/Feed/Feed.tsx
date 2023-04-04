import { api } from "~/utils/api";
import PostView from "~/components/PostView";
import Spinner from "~/components/Spinner";

const Feed = () => {
  const { data, isLoading } = api.post.getAll.useQuery();

  return (
    <div className="flex flex-col">
      {!!data ? (
        data.map(({ post, author }) => (
          <PostView post={post} author={author} key={post.id} />
        ))
      ) : isLoading ? (
        <Spinner />
      ) : (
        "Error loading data"
      )}
    </div>
  );
};

export default Feed;
