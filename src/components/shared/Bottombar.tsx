import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { useLocation, Link } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            className={` ${
              isActive && "bg-primary-500 rounded-[10px]"
            } flex-center flex-col p-2 gap-1 transition`}
            key={link.label}>
            <img
              src={link.imgURL}
              alt="Link.Label"
              width={16}
              height={16}
              className={` ${isActive ? "invert-white" : ""}`}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
