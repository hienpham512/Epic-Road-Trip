import React from "react";
import { useOutlet } from "react-router-dom";
import Navbar from "../components/Navbar";

interface IHomeLayoutProps {}

const HomeLayout: React.FC<IHomeLayoutProps> = ({}) => {
  const outlet = useOutlet();
  return (
    <div className="tracking-wider font-poppins scrollbar-hide">
      <Navbar />
      <div className="">{outlet}</div>
    </div>
  );
};

export default HomeLayout;
