import ActiveChats from "@/components/shared/ActiveChats";
import UserCard from "@/components/shared/UserCard";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/AuthContext";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetActiveChat,
  useSearchUser,
} from "@/lib/react-query/queriesAndMutation";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Chat = () => {
  let [searchValue, setSearchValue] = useState("");
  let debounceValue = useDebounce(searchValue, 200);
  let { user } = useUserContext();
  let {
    data: activeChats,
    refetch: refetchActiveChats,
    isPending: isActiveChats,
  } = useGetActiveChat(user?.id);

  console.log({ activeChats });

  let {
    data: searchedUser,
    refetch,
    isPending: isSearchingUser,
    isRefetching,
  } = useSearchUser(debounceValue);

  useEffect(() => {
    refetch();
  }, [searchValue, debounceValue]);

  return (
    <div className="leftchatbar">
      <div className="w-[98%] md:max-w-96 flex flex-col items-start ">
        <h2 className="flex items-center justify-start text-3xl h3-bold md:h2-bold text-left gap-3 mb-4">
          <img
            src="/assets/icons/chat.svg"
            alt="chat"
            className="invert-white w-8 "
          />
          <p>Chats</p>
        </h2>
        <div className="searchbar w-[98%] m-auto ">
          <Input
            type="text"
            placeholder="search users..."
            className="user-search "
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
        <div className=" flex-1 w-full p-1 overflow-auto custom-scrollbar mt-2">
          {searchValue === "" ? (
            isActiveChats ? (
              <div className="w-full flex-center">
                <Loader />
              </div>
            ) : activeChats?.length === 0 ? (
              <div className="w-full h-full flex-center flex-col">
                <p className="text-light-3 text-sm">No active chats yet</p>
                <p className="text-light-3 text-lg">Find people for chatting</p>
                <img
                  src="/assets/icons/startChat.svg"
                  alt="startChatIcon"
                  width={150}
                  height={150}
                />
              </div>
            ) : (
              <ActiveChats activeChats={activeChats} />
            )
          ) : isSearchingUser || isRefetching ? (
            <div className="text-center w-full flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <UserCard
              // @ts-ignore
              users={searchedUser?.documents}
              setSearchField={setSearchValue}
              searchField={searchValue}
              refetch={refetchActiveChats}
            />
          )}
        </div>
      </div>
      <div className="flex-1 bg-dark-3 rounded-lg p-4 hidden md:flex justify-center flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Chat;
