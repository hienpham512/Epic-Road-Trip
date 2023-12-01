import { useUser } from "@/contexts/authContext";
import {
  ShoppingCartIcon as CartIcon,
  BuildingStorefrontIcon as ChillIcon,
  FireIcon,
  Bars3Icon as HamburgerIcon,
  HomeIcon,
  TagIcon,
  UserCircleIcon as UserIcon,
} from "@heroicons/react/24/outline";
import {
  BuildingStorefrontIcon as ChillIconDark,
  FireIcon as FireIconDark,
  HomeIcon as HomeIconDark,
  TagIcon as TagIconDark,
  UserCircleIcon as UserIconDark,
} from "@heroicons/react/24/solid";
import { useOnClickOutside } from "@hooks/useClickOutside";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/logo.png";
import Cart from "./Cart";

interface INavbarProps {}

const Navbar: React.FC<INavbarProps> = ({}) => {
  const user = useUser();
  const tabs: ITabs[] = [
    {
      name: "Home",
      path: "/home/main",
      icon: <HomeIcon className="h-8" />,
      darkIcon: <HomeIconDark className="h-8 text-red-600" />,
    },
    {
      name: "Events & Attractions",
      path: "/home/events",
      icon: <FireIcon className="h-8" />,
      darkIcon: <FireIconDark className="h-8 text-red-600" />,
    },
    {
      name: "Food & Drinks",
      path: "/home/chill",
      icon: <ChillIcon className="h-8" />,
      darkIcon: <ChillIconDark className="h-8 text-red-600" />,
    },
    {
      name: "Accomodation",
      path: "/home/accomodations",
      icon: <TagIcon className="h-8" />,
      darkIcon: <TagIconDark className="h-8 text-red-600" />,
    },
  ];
  const [showSideBar, setShowSideBar] = React.useState<boolean>(false);
  const sideBarref = React.useRef<HTMLDivElement>(null);
  const [showCart, setShowCart] = React.useState<boolean>(false);
  const navigate = useNavigate();
  useOnClickOutside(sideBarref, () => setShowSideBar(false));

  return (
    <div className="h-16 bg-white z-30 shadow-md w-screen">
      <nav className="h-16 w-screen bg-white fixed top-0 left-0 flex items-center justify-between text-black px-4 z-30">
        <img src={logo} className="h-12" />
        <div className="flex items-center lg:hidden gap-4">
          <div
            className="hover:underline"
            role="button"
            onClick={() => setShowCart(true)}
          >
            <CartIcon className="h-8" />
          </div>
          <div role="button" onClick={() => setShowSideBar(true)}>
            <HamburgerIcon className="h-8" />
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-grow justify-center gap-12">
          <Tabs callback={(path: string) => navigate(path)} tabs={tabs} />
        </div>
        <div className="hidden lg:flex items-center gap-12">
          <div
            className="flex flex-col"
            role="button"
            onClick={() => setShowCart(true)}
          >
            <CartIcon className="h-8 text-black" />
            <p className="font-light">Cart</p>
          </div>
          <Authenticate
            callback={() => {
              setShowSideBar(false);
              user ? navigate("user") : navigate("/auth/signin");
            }}
          />
        </div>
      </nav>
      {/* Sidebar */}
      <div
        className={`z-50 fixed top-12 right-5 h-fit w-[70%] md:w-[35%] bg-white border rounded-xl shadow-lg lg:hidden transition-all ease-in-out origin-top-right ${
          showSideBar ? "scale-100" : "scale-0"
        }`}
        ref={sideBarref}
      >
        <div className="flex flex-col gap-6 p-5">
          <Tabs
            callback={(path: string) => {
              setShowSideBar(false);
              navigate(path);
            }}
            tabs={tabs}
          />
          <div className="w-full h-0.5 bg-gray-400" />
          <Authenticate
            callback={() => {
              setShowSideBar(false);
              user ? navigate("user") : navigate("/auth/signin");
            }}
          />
        </div>
      </div>
      {/* Sidecart */}
      <Cart setShowModal={setShowCart} showModal={showCart} />
    </div>
  );
};

export default Navbar;

type ITabs = {
  name: string;
  path: string;
  icon: React.ReactNode;
  darkIcon: React.ReactNode;
};

const Tabs: React.FC<{
  tabs: ITabs[];
  callback: (path: string) => void;
}> = ({ tabs, callback }) => {
  return (
    <>
      {tabs.map(({ name, path, icon, darkIcon }, index) => (
        <div
          key={index}
          className="flex items-center gap-3 lg:flex-col lg:gap-0"
          role="button"
          onClick={() => callback(path)}
        >
          {path === window.location.pathname ? darkIcon : icon}
          <p
            className={`${
              path === window.location.pathname
                ? "text-red-600 font-semibold"
                : "font-light"
            }`}
          >
            {name}
          </p>
        </div>
      ))}
    </>
  );
};

const Authenticate: React.FC<{
  callback: () => void;
}> = ({ callback }) => {
  const user = useUser();
  return (
    <div
      className="flex items-center gap-3 lg:flex-col lg:gap-0"
      role="button"
      onClick={callback}
    >
      {window.location.pathname.includes("/auth/signin") ||
      window.location.pathname.includes("/home/user") ? (
        <UserIconDark className="h-8 text-red-600" />
      ) : (
        <UserIcon className="h-8" />
      )}
      <p
        className={`${
          window.location.pathname.includes("/auth/signin") ||
          window.location.pathname.includes("/home/user")
            ? "text-red-600 font-semibold"
            : "font-light"
        }`}
      >
        {user ? user.email : "Authenticate"}
      </p>
    </div>
  );
};
