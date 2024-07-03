import { Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetUserLikedPost,
  useGetUserPost,
} from "@/lib/react-query/queriesAndMutation";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useEffect } from "react";

const Profile = () => {
  let { user: currentUser } = useUserContext();
  let { id } = useParams();
  let {
    data: posts,
    isPending: isPosts,
    refetch: refetchPosts,
    // @ts-ignore
  } = useGetUserPost(id);
  let {
    data: user,
    isPending: isLikedPosts,
    refetch: refetchUser,
    // @ts-ignore
  } = useGetUserLikedPost(id);

  useEffect(() => {
    refetchPosts();
    refetchUser();
  }, [id, refetchPosts, refetchUser]);
  if (!user) return <Loader />;

  return (
    <div className="profile-container">
      <div className="w-full h-auto">
        {isLikedPosts ? (
          <Loader />
        ) : (
          <div className="user-profile">
            <img
              src={user?.imageUrl}
              alt="profileImg"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="p-2 flex flex-col justify-start">
              <h2 className="text-2xl font-semibold">{user?.name}</h2>
              <h3 className="text-light-3">@{user?.username}</h3>
              <div className="flex items-start justify-start text-left gap-8 mt-4">
                <div className="flex flex-col items-start justify-start">
                  <p className="text-2xl text-primary-500">
                    {user?.posts?.length || 0}
                  </p>
                  <h3>Posts</h3>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <p className="text-2xl text-primary-500">##</p>
                  <h3>Followers</h3>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <p className="text-2xl text-primary-500">##</p>
                  <h3>Following</h3>
                </div>
              </div>
              <h3 className="text-light-3 my-2">🌿{user?.bio}</h3>
            </div>
            {currentUser.id === id && (
              <Link to={`/update-profile/${id}`}>
                <div className="flex items-center justify-center gap-2 bg-dark-3 p-2 rounded-lg">
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    className="invert-yellow w-5"
                  />
                  <p className="text-sm">Edit Button</p>
                </div>
              </Link>
            )}
          </div>
        )}
        <div className="w-full mt-5">
          <Tabs defaultValue="posts" className="text-xl">
            <TabsList className=" border-dark-4 w-full border  flex  justify-between h-auto">
              <TabsTrigger
                value="posts"
                className="text-base flex items-center justify-center gap-2 data-[state=active]:bg-dark-3 w-full p-3">
                <img
                  src="/assets/icons/posts.svg"
                  alt="Posts"
                  className="w-4 lg:w-5"
                />
                Posts
              </TabsTrigger>
              {currentUser.id === id && (
                <TabsTrigger
                  value="liked"
                  className="text-base flex items-center justify-center gap-2 data-[state=active]:bg-dark-3 w-full p-3">
                  <img
                    src="/assets/icons/like.svg"
                    alt="Like"
                    className="w-4 lg:w-5"
                  />
                  Liked Post
                </TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="posts">
              {isPosts ? (
                <Loader />
              ) : posts?.documents.length === 0 ? (
                <div className="file_uploader-box">
                  <img
                    src="/assets/icons/file-upload.svg"
                    width={96}
                    height={77}
                    alt="file_upload"
                  />
                  <h3 className="base-medium text-light-3 mb-2 mt-6">
                    No Posts Uploaded Yet
                  </h3>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center m-auto ">
                  <GridPostList
                    //@ts-ignore
                    posts={posts?.documents}
                    showUser={false}
                    showStats={false}
                  />
                </div>
              )}
            </TabsContent>
            <TabsContent value="liked">
              {isLikedPosts ? (
                <Loader />
              ) : // @ts-ignore
              user?.liked?.length === 0 || !user?.liked ? (
                <h1>No liked posts yet</h1>
              ) : (
                <div className="w-full flex items-center justify-center m-auto ">
                  <GridPostList
                    // @ts-ignore
                    posts={user?.liked}
                    showUser={false}
                    showStats={false}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
