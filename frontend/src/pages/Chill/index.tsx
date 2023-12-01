import Header from "@/components/Header";
import { useData } from "@contexts/dataContext";
import { IBar, INightClub, IRestaurant } from "@hienpham512/roadtrip";
import React, { useEffect, useState } from "react";
import Section from "./components/Section";

export enum PAGE_SELECTED {
  RESTAURANTS = "Restaurants",
  BARS = "Bars",
  NIGHTCLUBS = "Night clubs",
  EVENTS = "Events",
  ACCOMODATIONS = "Accomodations",
  ATTRACTIONS = "Attractions",
}

const Chill: React.FC = () => {
  const { restaurants, bars, nightclubs } = useData();
  const [restaurantsList, setRestaurantList] = useState<IRestaurant>();
  const [barsList, setBarsList] = useState<IRestaurant>();
  const [nightclubsList, setNightclubsList] = useState<IRestaurant>();
  const [data, setData] = useState<IRestaurant | IBar | INightClub | null>();
  const [pageSelected, setPageSelected] = useState<PAGE_SELECTED>(
    PAGE_SELECTED.RESTAURANTS
  );

  useEffect(() => {
    setRestaurantList(restaurants);
    setBarsList(bars);
    setNightclubsList(nightclubs);
  }, [restaurants, bars, nightclubs]);

  useEffect(() => {
    if (pageSelected === PAGE_SELECTED.RESTAURANTS) setData(restaurantsList);
    else if (pageSelected === PAGE_SELECTED.BARS) setData(barsList);
    else if (pageSelected === PAGE_SELECTED.NIGHTCLUBS) setData(nightclubsList);
    else setData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [restaurantsList, barsList, nightclubsList, pageSelected]);

  return (
    <div className="tracking-tighter">
      <Header
        title="Food & Drinks"
        filters={
          <CategoriesSelection
            setPageSelected={setPageSelected}
            pageSelected={pageSelected}
            pages={[
              PAGE_SELECTED.RESTAURANTS,
              PAGE_SELECTED.BARS,
              PAGE_SELECTED.NIGHTCLUBS,
            ]}
          />
        }
      />
      {data && <Section data={data} pageSelected={pageSelected} />}
    </div>
  );
};

interface ICategoriesSelectionProps {
  setPageSelected: React.Dispatch<React.SetStateAction<PAGE_SELECTED>>;
  pageSelected: PAGE_SELECTED;
  pages: PAGE_SELECTED[];
}

const CategoriesSelection: React.FC<ICategoriesSelectionProps> = ({
  setPageSelected,
  pageSelected,
  pages,
}) => {
  return (
    <div className="flex gap-3 items-center justify-center lg:justify-end m-2 p-3">
      {pages.map((page, index) => {
        return (
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-md transition-all ease-in-out hover:scale-105 ${
              pageSelected === page ? "bg-blue-900 text-white" : "bg-white"
            }`}
            key={index}
            onClick={() => setPageSelected(page)}
            role="button"
          >
            <p>{page}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Chill;
