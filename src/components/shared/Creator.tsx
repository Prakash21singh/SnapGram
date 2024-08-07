import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { MouseEventHandler } from "react";
import { useUserContext } from "@/context/AuthContext";

type CreatorProps = {
  userId: string;
  name: string;
  imageUrl: string;
  handleFollowCreator: MouseEventHandler;
  username: string;
  className?: string;
};
const Creator = ({
  userId,
  name,
  imageUrl,
  handleFollowCreator,
  username,
  className,
}: CreatorProps) => {
  let { user } = useUserContext();

  return (
    <div
      className={`creator-card flex flex-col justify-center items-center w-full 2xl:w-[47%] ${className}`}>
      <Link className="cursor-pointer" to={`/profile/${userId}`}>
        <img
          src={imageUrl}
          alt="creatorImg"
          width={60}
          height={60}
          className="object-cover rounded-full"
        />
      </Link>
      <h3 className="mt-2 font-semibold">{name}</h3>
      <h3 className=" text-light-3 ">{username}</h3>
      {user.id !== userId ? (
        <Button
          onClick={handleFollowCreator}
          className="bg-primary-500 px-5 my-2 rounded-xl">
          Follow
        </Button>
      ) : (
        <Link to={`/profile/${userId}`}>
          <Button className="bg-primary-500 px-5 my-2 rounded-xl">
            Profile
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Creator;
