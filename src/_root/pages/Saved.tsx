import Loader from "@/components/shared/Loader";
import SavedPost from "@/components/shared/SavedPost";
import { useUserContext } from "@/context/AuthContext";
import { useGetSavedPost } from "@/lib/react-query/queriesAndMutation";
import SavedIcon from "/assets/icons/saved.svg";
const Saved = () => {
  let { user } = useUserContext();
  let { data: posts, isPending: isPosts } = useGetSavedPost(user.id);

  console.log(posts);
  return (
    <div className="explore-container ">
      <div className="inner-saved flex items-start justify-start p-5">
        {isPosts ? (
          <Loader />
        ) : (
          <>
            <div className="w-full">
              <p className="flex items-center font-semibold text-3xl ">
                {" "}
                <img src={SavedIcon} alt="savedPost" className="w-8 my-2" />
                Saved Posts
              </p>
              <SavedPost posts={posts?.documents} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Saved;
