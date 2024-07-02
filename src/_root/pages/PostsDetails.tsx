import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutation";
import { formatDateString } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const PostsDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  const { user } = useUserContext();
  function handleDeletePost() {}

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3">
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator?.name}
                  </p>
                  <div className="flex flex-col justify-center items-start lg:flex-row lg:items-center  gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {formatDateString(post?.$createdAt || "")}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center ">
                <Link to={`/update-post/${post?.$id}`}>
                  <img
                    src="/assets/icons/edit.svg"
                    alt=""
                    width={24}
                    className={`${user.id !== post?.creator.$id && "hidden"}`}
                  />
                </Link>
                <Button
                  variant={"ghost"}
                  className={`ghost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}
                  onClick={handleDeletePost}>
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags?.map((tag: string) => (
                  <li key={tag}>#{tag}</li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user?.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsDetails;
