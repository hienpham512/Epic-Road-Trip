import {
  IAccomodationResult,
  IAttractionResult,
  IBarResult,
  IEventItems,
  INightClubResult,
  IPackage,
  IRestaurantResult,
} from "@hienpham512/roadtrip";

import React from "react";

type ICartContext = {
  accomodations: IAccomodationResult[];
  events: IEventItems[];
  attractions: IAttractionResult[];
  restaurants: IRestaurantResult[];
  bars: IBarResult[];
  nightclubs: INightClubResult[];
  packages: IPackage[];
  setAccomodations: (accomodations: IAccomodationResult[]) => void;
  setEvents: (events: IEventItems[]) => void;
  setAttractions: (attractions: IAttractionResult[]) => void;
  setRestaurants: (restaurants: IRestaurantResult[]) => void;
  setBars: (bars: IBarResult[]) => void;
  setNightclubs: (nightclubs: INightClubResult[]) => void;
  setPackages: (packages: IPackage[]) => void;
};

const CartContext = React.createContext<ICartContext>({} as ICartContext);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accomodations, setAccomodations] = React.useState<
    IAccomodationResult[]
  >([]);
  const [events, setEvents] = React.useState<IEventItems[]>(
    [] as IEventItems[]
  );
  const [attractions, setAttractions] = React.useState<IAttractionResult[]>([]);
  const [restaurants, setRestaurants] = React.useState<IRestaurantResult[]>([]);
  const [bars, setBars] = React.useState<IBarResult[]>([]);
  const [nightclubs, setNightclubs] = React.useState<INightClubResult[]>([]);
  const [packages, setPackages] = React.useState<IPackage[]>([]);

  return (
    <CartContext.Provider
      value={{
        accomodations,
        events,
        attractions,
        restaurants,
        bars,
        nightclubs,
        packages,
        setAccomodations,
        setEvents,
        setAttractions,
        setRestaurants,
        setBars,
        setNightclubs,
        setPackages,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => React.useContext(CartContext);

export default CartProvider;
