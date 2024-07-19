import { Models } from "appwrite";
import { Link } from "react-router-dom";

const UserCard = ({
  users,
}: {
  users: Models.DocumentList<Models.Document> | undefined;
}) => {
  if (users?.documents.length === 0) {
    return (
      <div className="text-light-4 text-center">
        No user found with this name
      </div>
    );
  }

  return users?.documents?.map((user) => (
    <Link
      to={`/chats/${user.$id}`}
      className=" flex-1 w-full p-5 overflow-auto custom-scrollbar mt-2 flex items-center justify-start gap-2   border-b-[0.5px] border-dark-4 hover:bg-dark-2">
      <img src={user.imageUrl} alt="image" className="w-12 rounded-full" />
      <div>
        <h3 className="text-light-2 lg:font-semibold font-bold text-lg">
          {user.name}
        </h3>
        <h3 className="text-light-3 text-sm">{user.username}</h3>
      </div>
    </Link>
  ));
};

export default UserCard;
