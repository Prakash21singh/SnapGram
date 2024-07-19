import { useUserContext } from "@/context/AuthContext";
import React from "react";
import { Link, NavLink } from "react-router-dom";

//@ts-ignore
const ActiveChats = ({ activeChats }) => {
  let { user: currentUser } = useUserContext();

  console.log(activeChats);
  return (
    <div>
      {activeChats?.map(
        //@ts-ignore
        (chat) => (
          <NavLink
            to={`/chats/${chat.$id}`}
            className={({ isActive }) =>
              `cursor-pointer flex-1 w-full p-5 overflow-auto custom-scrollbar mt-2 flex items-center justify-start gap-2   border-b-[0.5px] border-dark-4 ${
                isActive && "bg-dark-2"
              } hover:bg-dark-2`
            }>
            <>
              {
                <img
                  src={
                    //@ts-ignore
                    chat?.users?.find((user) => user?.$id !== currentUser.id)
                      ?.imageUrl
                  }
                  alt="image"
                  className="w-12 rounded-full"
                />
              }

              <div>
                <h3 className="text-light-2 lg:font-semibold font-bold text-lg">
                  {
                    //@ts-ignore
                    chat?.users?.find((user) => user?.$id !== currentUser.id)
                      ?.name
                  }
                </h3>
                <h3 className="text-light-3 text-sm">
                  @
                  {
                    //@ts-ignore
                    chat?.users?.find((user) => user?.$id !== currentUser.id)
                      ?.username
                  }
                </h3>
              </div>
            </>
          </NavLink>
        )
      )}
    </div>
  );
};

export default ActiveChats;
