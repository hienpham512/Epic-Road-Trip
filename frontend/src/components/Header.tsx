import { useLocation } from "@/contexts/locationContext";
import React from "react";
import Location from "./Location";

interface IHeaderProps {
  title: string;
  filters?: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ title, filters }) => {
  const { setLocation } = useLocation();

  return (
    <div className="bg-blue-600 w-full flex items-center justify-center flex-col gap-4 p-5 sticky top-0 z-40">
      <p className="text-3xl font-bold text-white">{title}</p>
      <Location
        setLocation={setLocation}
        end
        width="w-full lg:w-[40%] md:w-[60%]"
      />
      {filters && filters}
    </div>
  );
};

export default Header;
