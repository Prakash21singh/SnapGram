import PostCard from "@/components/shared/PostCard";
import {
  useGetInfiniteRecentPosts,
  useGetUsers,
} from "@/lib/react-query/queriesAndMutation";
import Loader from "@/components/shared/Loader";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Creator from "@/components/shared/Creator";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { ID } from "appwrite";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
const Home = () => {
  let { user } = useUserContext();
  let {
    data: posts,
    isPending: isPostLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteRecentPosts();
  let { ref, inView } = useInView();
  let { data: users, isPending: isUsersLoading } = useGetUsers(10);
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <>
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {posts?.pages?.map((post) =>
                  post?.documents.map((post) => (
                    <PostCard post={post} key={`key-${ID.unique()}`} />
                  ))
                )}
              </ul>
              {hasNextPage && (
                <div ref={ref}>
                  <Loader />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="home-creators">
        <div className="creator_box flex flex-col w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">Top creators</h2>
          <div className="flex flex-wrap gap-5 items-center justify-center 2xl:justify-start mt-12 w-full">
            {isUsersLoading ? (
              <Loader />
            ) : (
              users?.documents?.map((user) => (
                <>
                  <Creator
                    key={`userIndex-${ID.unique()}`}
                    imageUrl={user.imageUrl}
                    handleFollowCreator={(e) => {
                      e.stopPropagation();
                      return toast({
                        title: "Feature not Available!",
                        description: "This feature is not available right now.",
                        action: (
                          <ToastAction
                            className="border px-5 py-2 rounded-lg border-gray-800"
                            altText="Try again">
                            Try again
                          </ToastAction>
                        ),
                        variant: "default",
                      });
                    }}
                    userId={user.$id}
                    name={user.name}
                    username={user.username}
                  />
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
