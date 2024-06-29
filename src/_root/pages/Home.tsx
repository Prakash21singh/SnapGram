import PostCard from "@/components/shared/PostCard";
import { useGetInfiniteRecentPosts } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import Loader from "@/components/shared/Loader";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  let {
    data: posts,
    isPending: isPostLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteRecentPosts();
  let { ref, inView } = useInView();

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
                  post?.documents.map((post, index) => (
                    <PostCard post={post} key={`key-${index}`} />
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
    </div>
  );
};

export default Home;
