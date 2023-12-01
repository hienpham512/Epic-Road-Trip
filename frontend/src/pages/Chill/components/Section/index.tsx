import { IRestaurant, IRestaurantResult } from "@hienpham512/roadtrip";

import Card from "../Card";
import { PAGE_SELECTED } from "@pages/Chill";
import React from "react";
import { useData } from "@contexts/dataContext";

interface ISectionProps {
  data: IRestaurant;
  pageSelected: PAGE_SELECTED;
}

const Section: React.FC<ISectionProps> = ({ data, pageSelected }) => {
  const { fetchNextPage } = useData();
  React.useEffect(() => {
    const handleScroll = () =>
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      fetchNextPage(
        data.results,
        (() => {
          if (pageSelected === PAGE_SELECTED.RESTAURANTS) return "restaurants";
          else if (pageSelected === PAGE_SELECTED.BARS) return "bars";
          else if (pageSelected === PAGE_SELECTED.NIGHTCLUBS)
            return "nightclubs";
          else return "";
        })(),
        data.next_page_token
      );
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data.results]);

  return (
    <div className="grid">
      <div className="flex justify-center items-center p-2">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-6 xl:grid-cols-3 px-2 lg:px-5 bg-gray-100 py-8 w-full">
          {data?.results?.map(
            (restaurant: IRestaurantResult, index: number) => {
              return (
                <Card
                  place={restaurant}
                  key={index}
                  pageSelected={pageSelected}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Section;
