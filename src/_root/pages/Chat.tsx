import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Chat = () => {
  let [searchValue, setSearchValue] = useState("");
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
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
          <p className="w-full p-7 bg-dark-3 rounded-lg mt-1">chat user 1</p>
        </div>
      </div>
      <div className="flex-1 bg-dark-3 rounded-lg p-4 hidden md:flex">
        <Outlet />
        sdfkhdsfdjsk
      </div>
    </div>
  );
};

export default Chat;
