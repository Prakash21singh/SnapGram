import { Link } from "react-router-dom";
import { IProfileUser } from "../../types/index";

const UserProfile = ({ user }: { user: IProfileUser }) => {
  return (
    <div className="flex items-center justify-start gap-4 ">
      <Link
        to={`/profile/${user.$id}`}
        className="relative  rounded-full w-12 h-12">
        <img
          src={user?.imageUrl}
          alt="userImage"
          className=" rounded-full w-full h-full absolute"
        />
        <p className="absolute z-10 bottom-0 right-0 text-sm border border-3-white p-[6px] rounded-full bg-green-400"></p>
      </Link>
      <div className="flex flex-col">
        <p className="text-lg capitalize font-semibold">{user.name}</p>
        <p className="text-light-4">Online</p>
      </div>
    </div>
  );
};

export default UserProfile;
