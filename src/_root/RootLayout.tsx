import React from "react";
import { Outlet } from "react-router-dom";

import Leftbar from "@/components/shared/Leftbar";
import TopBar from "@/components/shared/TopBar";
import Bottombar from "@/components/shared/Bottombar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex ">
      <TopBar />
      <Leftbar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
