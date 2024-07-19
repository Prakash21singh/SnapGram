import { useUserContext } from "@/context/AuthContext";
import { useCreateActiveChat } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";

const UserCard = ({
  users,
  searchField,
  setSearchField,
  refetch,
}: {
  users: Models.DocumentList<Models.Document> | undefined;
  setSearchField: Function;
  searchField: string;
  refetch: Function;
}) => {
  let { user } = useUserContext();
  let navigate = useNavigate();
  let { mutateAsync: createChat, isPending } = useCreateActiveChat();

  async function handleCreateChat(userId: string) {
    createChat({
      currentUserId: user.id,
      otherUserId: userId,
    })
      .then((chat) => {
        setSearchField("");
        navigate(`/chats/${chat?.$id}`);
        refetch();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Chat creation",
          description: error.message,
        });
      });
  }
  //@ts-ignore
  if (users?.length === 0) {
    return (
      <div className="text-light-4 text-center">
        No user found with this name
      </div>
    );
  }
  //@ts-ignore
  return users?.map((user) => (
    <div
      onClick={() => {
        handleCreateChat(user.$id);
      }}
      className="cursor-pointer flex-1 w-full p-5 overflow-auto custom-scrollbar mt-2 flex items-center justify-start gap-2   border-b-[0.5px] border-dark-4 hover:bg-dark-2">
      {isPending ? (
        <Loader />
      ) : (
        <>
          <img src={user.imageUrl} alt="image" className="w-12 rounded-full" />
          <div>
            <h3 className="text-light-2 lg:font-semibold font-bold text-lg">
              {user.name}
            </h3>
            <h3 className="text-light-3 text-sm">@{user.username}</h3>
          </div>
        </>
      )}
    </div>
  ));
};

export default UserCard;
