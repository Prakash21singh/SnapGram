import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";

const Leftbar = () => {
  let { mutate: signOut, isSuccess: isLoggedOut } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  useEffect(() => {
    if (isLoggedOut) {
      navigate(0);
    }
  }, [isLoggedOut]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-14 h-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive ? "bg-primary-500" : ""
                }`}
                key={link.label}>
                <NavLink
                  to={link.route}
                  className={`flex gap-4 items-center p-4`}>
                  <img
                    src={link.imgURL}
                    alt="Link.Label"
                    className={`group-hover:invert-white ${
                      isActive ? "invert-white" : ""
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant={"ghost"}
        className="shad-button_ghost"
        onClick={() => {
          signOut();
        }}>
        <img src="/assets/icons/logout.svg" alt="" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default Leftbar;
