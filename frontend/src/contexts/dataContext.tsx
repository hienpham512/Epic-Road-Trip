import {
  IAccomodation,
  IAccomodationResult,
  IAttraction,
  IAttractionResult,
  IBar,
  IBarResult,
  IEvent,
  IEventItems,
  INightClub,
  INightClubResult,
  IPackage,
  IRestaurant,
  IRestaurantResult,
} from "@hienpham512/roadtrip";

import React from "react";
import axios from "axios";
import { useLocation } from "@contexts/locationContext";

const DataContext = React.createContext<{
  events: IEvent;
  attractions: IAttraction;
  accomodations: IAccomodation;
  restaurants: IRestaurant;
  bars: IBar;
  nightclubs: INightClub;
  fetchNextPage: (
    previousResults:
      | IRestaurantResult[]
      | IAccomodationResult[]
      | IAttractionResult[]
      | IBarResult[]
      | INightClubResult[]
      | IEventItems[],
    endpoint: string,
    nextPageToken: string,
    page?: number
  ) => Promise<void> | undefined;
}>(
  {} as {
    accomodations: IAccomodation;
    attractions: IAttraction;
    events: IEvent;
    restaurants: IRestaurant;
    bars: IBar;
    nightclubs: INightClub;
    fetchNextPage: (
      previousResults:
        | IRestaurantResult[]
        | IAccomodationResult[]
        | IAttractionResult[]
        | IBarResult[]
        | INightClubResult[]
        | IEventItems[],
      endpoint: string,
      nextPageToken: string,
      page?: number
    ) => Promise<void> | undefined;
  }
);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accomodations, setAccomodations] = React.useState<IAccomodation>(
    {} as IAccomodation
  );
  const [attractions, setAttractions] = React.useState<IAttraction>(
    {} as IAttraction
  );
  const [events, setEvents] = React.useState<IEvent>({} as IEvent);
  const [restaurants, setRestaurants] = React.useState<IRestaurant>(
    {} as IRestaurant
  );
  const [bars, setBars] = React.useState<IBar>({} as IBar);
  const [nightclubs, setNightclubs] = React.useState<INightClub>(
    {} as INightClub
  );

  const {
    location: { lat, lng },
  } = useLocation();

  const fetchData = (
    endpoint: string,
    setData:
      | React.Dispatch<React.SetStateAction<IAccomodation>>
      | React.Dispatch<React.SetStateAction<IAttraction>>
      | React.Dispatch<React.SetStateAction<IEvent>>
      | React.Dispatch<React.SetStateAction<IRestaurant>>
      | React.Dispatch<React.SetStateAction<IBar>>
      | React.Dispatch<React.SetStateAction<INightClub>>
      | React.Dispatch<React.SetStateAction<IPackage>>
  ) =>
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/${endpoint}`,
        {
          location: {
            lat: lat,
            lng: lng,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

  React.useEffect(() => {
    fetchData("events", setEvents);
    fetchData("attractions", setAttractions);
    fetchData("accomodations", setAccomodations);
    fetchData("restaurants", setRestaurants);
    fetchData("bars", setBars);
    fetchData("nightclubs", setNightclubs);
  }, [lat, lng]);

  const fetchNextPage = (
    previousResults:
      | IRestaurantResult[]
      | IAccomodationResult[]
      | IAttractionResult[]
      | IBarResult[]
      | INightClubResult[]
      | IEventItems[],
    endpoint: string,
    nextPageToken: string,
    page: number = 1
  ) => {
    const url: string = `${import.meta.env.VITE_API_URL}/${endpoint}/nextpage`;
    if (endpoint === "events")
      return axios
        .post(
          url,
          {
            location: {
              lat: lat,
              lng: lng,
            },
          },
          {
            params: {
              page: page,
            },
          }
        )
        .then((res) =>
          setEvents({
            ...res.data,
            events: [...previousResults, ...res.data.events],
          })
        )
        .catch((err) => console.log(err));
    else
      axios
        .get(url, {
          params: {
            pagetoken: nextPageToken,
          },
        })
        .then((res) => {
          switch (endpoint) {
            case "restaurants":
              setRestaurants({
                ...res.data,
                results: [...previousResults, ...res.data.results],
              });
              break;
            case "accomodations":
              setAccomodations({
                ...res.data,
                results: [...previousResults, ...res.data.results],
              });
              break;
            case "attractions":
              setAttractions({
                ...res.data,
                results: [...previousResults, ...res.data.results],
              });
              break;
            case "bars":
              setBars({
                ...res.data,
                results: [...previousResults, ...res.data.results],
              });
              break;
            case "nightclubs":
              setNightclubs({
                ...res.data,
                results: [...previousResults, ...res.data.results],
              });
              break;
            default:
              break;
          }
        })
        .catch((err) => console.log(err));
  };

  return (
    <DataContext.Provider
      value={{
        accomodations,
        attractions,
        events,
        restaurants,
        bars,
        nightclubs,
        fetchNextPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => React.useContext(DataContext);

export default DataProvider;
