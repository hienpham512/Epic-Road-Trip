import InfoCard from "@/components/InfoCard";
import Location from "@/components/Location";
import { useData } from "@/contexts/dataContext";
import { useLocation } from "@/contexts/locationContext";
import {
  IAccomodationResult,
  IAttractionResult,
  IBarResult,
  IEventItems,
  ILocation,
  INightClubResult,
  IRestaurantResult,
} from "@hienpham512/roadtrip";
import axios from "axios";
import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { PAGE_SELECTED } from "./Chill";
import EventCard from "@/components/EventCard";
import { useCart } from "@/contexts/cartContext";

type IPackageNew = {
  accomodation: IAccomodationResult;
  attractions: IAttractionResult[];
  restaurants: IRestaurantResult[];
  bars: IBarResult[];
  nightclubs: INightClubResult[];
  events: IEventItems[];
};

const Home: React.FC = ({}) => {
  const { location: endLocation, setLocation: setEndLocation } = useLocation();
  const [startLocation, setStartLocation] = React.useState<ILocation>(
    {} as ILocation
  );
  const [duration, setDuration] = React.useState<
    | {
        startDate: Date | null;
        endDate: Date | null;
      }
    | any
  >({
    startDate: null,
    endDate: null,
  });

  const [events, setEvents] = React.useState<IEventItems[]>([]);
  const [userPackage, setUserPackage] = React.useState<IPackageNew>(
    {} as IPackageNew
  );
  const [displayResults, setDisplayResults] = React.useState<boolean>(false);
  const { accomodations, attractions, restaurants, bars, nightclubs } =
    useData();

  const fetchEvents = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/events`,
        {
          location: {
            lat: endLocation.lat,
            lng: endLocation.lng,
          },
        },
        {
          params: {
            startDateTime:
              new Date(duration.startDate).toISOString().split(".")[0] + "Z",
            endDateTime:
              new Date(duration.endDate).toISOString().split(".")[0] + "Z",
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        //filter out events that have the same name
        const filteredEvents = res.data.events.filter(
          (event: IEventItems, index: number) => {
            return (
              res.data.events.findIndex(
                (e: IEventItems) =>
                  e.name.toLowerCase().slice(0, 8) ===
                  event.name.toLowerCase().slice(0, 8)
              ) === index
            );
          }
        );
        setEvents(filteredEvents);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    if (
      !accomodations.results ||
      !attractions.results ||
      !restaurants.results ||
      !bars.results ||
      !nightclubs.results ||
      !events
    )
      return;
    if (
      accomodations.results.length === 0 ||
      attractions.results.length === 0 ||
      restaurants.results.length === 0 ||
      bars.results.length === 0 ||
      nightclubs.results.length === 0 ||
      events.length === 0
    )
      return;
    if (
      userPackage.accomodation ||
      userPackage.attractions ||
      userPackage.restaurants ||
      userPackage.bars ||
      userPackage.nightclubs ||
      userPackage.events
    )
      return;
    // if (!accomodations.results || accomodations.results.length === 0) return;
    // if (!attractions.results || attractions.results.length === 0) return;
    // if (!restaurants.results || restaurants.results.length === 0) return;
    // if (!bars.results || bars.results.length === 0) return;
    // if (!nightclubs.results || nightclubs.results.length === 0) return;
    // if (!events || events.length === 0) return;

    const topPickAccomodation = accomodations.results.sort(
      (a, b) => b.rating - a.rating
    )[0];
    const topPickAttractions = attractions.results
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    const topPickRestaurants = restaurants.results
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    const topPickBars = bars.results
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    const topPickNightclubs = nightclubs.results
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);

    setUserPackage({
      accomodation: topPickAccomodation,
      events: events.slice(0, 3),
      attractions: topPickAttractions,
      restaurants: topPickRestaurants,
      bars: topPickBars,
      nightclubs: topPickNightclubs,
    });
    setDisplayResults(true);
  }, [accomodations, attractions, restaurants, bars, nightclubs, events]);

  const {
    setAccomodations,
    setAttractions,
    setRestaurants,
    setBars,
    setNightclubs,
    accomodations: cartAccomodations,
    attractions: cartAttractions,
    restaurants: cartRestaurants,
    bars: cartBars,
    events: cartEvents,
    nightclubs: cartNightclubs,
  } = useCart();

  return (
    <div className="tracking-tighter">
      <div className="flex flex-col lg:flex-row lg:justify-center gap-6 border-t bg-blue-600 p-5 lg:sticky lg:top-0 lg:z-40">
        <Location start setLocation={setStartLocation} />
        <Location end setLocation={setEndLocation} />
        <Datepicker
          onChange={(value) => setDuration(value)}
          value={duration}
          primaryColor="red"
          separator={"-"}
          placeholder="Duration"
          containerClassName="w-full lg:w-64 xl:w-72"
          inputClassName="dark:bg-white bg-white dark:border dark:border-gray-200 border border-gray-200 rounded-md font-medium dark:px-6 px-6 dark:pr-12 pr-12 truncate dark:text-gray-900 text-gray-900"
          toggleClassName="px-5 text-blue-700"
          displayFormat="DD/MM/YYYY"
        />
        <button
          className="bg-blue-500 text-white rounded-md px-6 py-2 transition-all ease-in-out lg:hover:bg-blue-400 w-full lg:w-64 xl:w-72"
          onClick={fetchEvents}
        >
          Let's go !
        </button>
      </div>
      <div className="font-bold mb-16">
        {userPackage &&
          userPackage?.accomodation &&
          userPackage?.attractions &&
          userPackage?.events &&
          userPackage?.restaurants &&
          userPackage?.bars &&
          userPackage?.nightclubs &&
          displayResults && (
            <>
              <p className="text-3xl p-5">Your package</p>
              <div className="overflow-x-scroll flex gap-6 scrollbar-hide p-5">
                {Object.keys(userPackage.accomodation).length > 0 && (
                  <div className="space-y-2">
                    <p className="text-2xl font-medium">Accomodation</p>
                    {(() => {
                      const { accomodation } = userPackage;
                      const {
                        name,
                        photos,
                        rating,
                        user_ratings_total,
                        vicinity,
                        opening_hours,
                      } = accomodation;
                      return (
                        <InfoCard
                          name={name}
                          photo={photos[0].photo_reference}
                          rating={rating}
                          user_ratings_total={user_ratings_total}
                          vicinity={vicinity}
                          open_now={opening_hours?.open_now}
                          place={accomodation}
                          pageSelected={PAGE_SELECTED.ACCOMODATIONS}
                          home
                          condition={!!userPackage.accomodation}
                          callback={() => {
                            setUserPackage({
                              ...userPackage,
                              accomodation: {} as IAccomodationResult,
                            });
                          }}
                        />
                      );
                    })()}
                  </div>
                )}
                {userPackage.events.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-2xl font-medium">Events</p>
                    <div className="flex gap-6">
                      {userPackage?.events?.map((event, index) => {
                        const {
                          name,
                          url,
                          _embedded,
                          images,
                          description,
                          // classifications,
                          dates,
                          priceRanges,
                        } = event;
                        return (
                          <EventCard
                            key={index}
                            home
                            url={url}
                            images={images}
                            name={name}
                            description={description}
                            priceRanges={priceRanges}
                            _embedded={_embedded}
                            dates={dates}
                            event={event}
                            condition={!!userPackage.events.includes(event)}
                            callback={() => {
                              const newEvents = userPackage.events.filter(
                                (e: IEventItems) => e.id !== event.id
                              );
                              setUserPackage({
                                ...userPackage,
                                events: newEvents,
                              });
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
                {userPackage.attractions.length > 0 && (
                  <DisplayPackage
                    title="Attractions"
                    dataArray={userPackage?.attractions}
                    selectedPage={PAGE_SELECTED.ATTRACTIONS}
                    userPackage={userPackage}
                    setUserPackage={setUserPackage}
                  />
                )}
                {userPackage.restaurants.length > 0 && (
                  <DisplayPackage
                    title="Restaurants"
                    dataArray={userPackage?.restaurants}
                    selectedPage={PAGE_SELECTED.RESTAURANTS}
                    userPackage={userPackage}
                    setUserPackage={setUserPackage}
                  />
                )}
                {userPackage.bars.length > 0 && (
                  <DisplayPackage
                    title="Bars"
                    dataArray={userPackage?.bars}
                    selectedPage={PAGE_SELECTED.BARS}
                    userPackage={userPackage}
                    setUserPackage={setUserPackage}
                  />
                )}
                {userPackage.nightclubs.length > 0 && (
                  <DisplayPackage
                    title="Nightclubs"
                    dataArray={userPackage?.nightclubs}
                    selectedPage={PAGE_SELECTED.NIGHTCLUBS}
                    userPackage={userPackage}
                    setUserPackage={setUserPackage}
                  />
                )}
              </div>
            </>
          )}

        {displayResults && (
          <div
            className="flex justify-center md:justify-end mx-5"
            onClick={() => {
              setAccomodations([
                ...cartAccomodations,
                userPackage.accomodation,
              ]);
              setEvents([...cartEvents, ...userPackage.events]);
              setAttractions([...cartAttractions, ...userPackage.attractions]);
              setRestaurants([...cartRestaurants, ...userPackage.restaurants]);
              setBars([...cartBars, ...userPackage.bars]);
              setNightclubs([...cartNightclubs, ...userPackage.nightclubs]);
            }}
          >
            <button className="bg-blue-600 button-x py-2 px-4 min-w-full md:min-w-[16rem] text-white text-center mx-5 rounded-lg">
              Add to cart
            </button>
          </div>
        )}
      </div>
      {displayResults && (
        <>
          <DisplaySuggestions
            dataArray={accomodations.results}
            selectedPage={PAGE_SELECTED.ACCOMODATIONS}
            title="Suggested Accomodations"
            userPackage={userPackage}
            setUserPackage={setUserPackage}
          />
          <div className="mb-8 space-y-0">
            <p className="text-3xl p-5 font-bold text-center lg:text-start">
              Suggested Events
            </p>
            <div className="overflow-x-scroll flex gap-6 scrollbar-hide p-5">
              {events?.map((event, index) => {
                const {
                  name,
                  url,
                  _embedded,
                  images,
                  description,
                  // classifications,
                  dates,
                  priceRanges,
                } = event;
                return (
                  <EventCard
                    key={index}
                    home
                    url={url}
                    images={images}
                    name={name}
                    description={description}
                    priceRanges={priceRanges}
                    _embedded={_embedded}
                    dates={dates}
                    event={event}
                    condition={!!userPackage.events.includes(event)}
                    callback={() => {
                      setUserPackage({
                        ...userPackage,
                        events: [...userPackage.events, event],
                      });
                      setEvents(events.filter((e) => e.id !== event.id));
                    }}
                  />
                );
              })}
            </div>
          </div>
          <DisplaySuggestions
            dataArray={attractions.results}
            selectedPage={PAGE_SELECTED.ATTRACTIONS}
            title="Suggested Attractions"
            userPackage={userPackage}
            setUserPackage={setUserPackage}
          />
          <DisplaySuggestions
            dataArray={restaurants.results}
            selectedPage={PAGE_SELECTED.RESTAURANTS}
            title="Suggested Restaurants"
            userPackage={userPackage}
            setUserPackage={setUserPackage}
          />
          <DisplaySuggestions
            dataArray={bars.results}
            selectedPage={PAGE_SELECTED.BARS}
            title="Suggested Bars"
            userPackage={userPackage}
            setUserPackage={setUserPackage}
          />
          <DisplaySuggestions
            dataArray={nightclubs.results}
            selectedPage={PAGE_SELECTED.NIGHTCLUBS}
            title="Suggested Nightclubs"
            userPackage={userPackage}
            setUserPackage={setUserPackage}
          />
        </>
      )}
    </div>
  );
};

export default Home;

const DisplayPackage: React.FC<{
  title: string;
  dataArray:
    | IAttractionResult[]
    | IAccomodationResult[]
    | IRestaurantResult[]
    | IBarResult[]
    | INightClubResult[];
  selectedPage: PAGE_SELECTED;
  userPackage: IPackageNew;
  setUserPackage: React.Dispatch<React.SetStateAction<IPackageNew>>;
}> = ({ title, dataArray, selectedPage, userPackage, setUserPackage }) => {
  return (
    <div className="space-y-2">
      <p className="text-2xl font-medium">{title}</p>
      <div className="flex gap-6">
        {dataArray.map((data, index) => {
          const {
            name,
            photos,
            rating,
            user_ratings_total,
            vicinity,
            opening_hours,
          } = data;
          return (
            <InfoCard
              key={index}
              name={name}
              photo={photos[0]?.photo_reference}
              rating={rating}
              user_ratings_total={user_ratings_total}
              vicinity={vicinity}
              open_now={opening_hours?.open_now}
              place={data}
              pageSelected={selectedPage}
              home
              condition={(() => {
                switch (selectedPage) {
                  case PAGE_SELECTED.ATTRACTIONS:
                    return !!userPackage.attractions.includes(
                      data as IAttractionResult
                    );
                  case PAGE_SELECTED.RESTAURANTS:
                    return !!userPackage.restaurants.includes(
                      data as IRestaurantResult
                    );
                  case PAGE_SELECTED.BARS:
                    return !!userPackage.bars.includes(data as IBarResult);
                  case PAGE_SELECTED.NIGHTCLUBS:
                    return !!userPackage.nightclubs.includes(
                      data as INightClubResult
                    );
                  default:
                    break;
                }
              })()}
              callback={() => {
                switch (selectedPage) {
                  case PAGE_SELECTED.ATTRACTIONS:
                    const newAttractions = userPackage.attractions.filter(
                      (a: IAttractionResult) => a.place_id !== data.place_id
                    );
                    setUserPackage({
                      ...userPackage,
                      attractions: newAttractions,
                    });
                    break;
                  case PAGE_SELECTED.RESTAURANTS:
                    const newRestaurants = userPackage.restaurants.filter(
                      (a: IRestaurantResult) => a.place_id !== data.place_id
                    );
                    setUserPackage({
                      ...userPackage,
                      restaurants: newRestaurants,
                    });
                    break;
                  case PAGE_SELECTED.BARS:
                    const newBars = userPackage.bars.filter(
                      (a: IBarResult) => a.place_id !== data.place_id
                    );
                    setUserPackage({
                      ...userPackage,
                      bars: newBars,
                    });
                    break;
                  case PAGE_SELECTED.NIGHTCLUBS:
                    const newNightclubs = userPackage.nightclubs.filter(
                      (a: INightClubResult) => a.place_id !== data.place_id
                    );
                    setUserPackage({
                      ...userPackage,
                      nightclubs: newNightclubs,
                    });
                    break;
                  default:
                    break;
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const DisplaySuggestions: React.FC<{
  title: string;
  dataArray:
    | IAttractionResult[]
    | IAccomodationResult[]
    | IRestaurantResult[]
    | IBarResult[]
    | INightClubResult[];
  selectedPage: PAGE_SELECTED;
  userPackage: IPackageNew;
  setUserPackage: React.Dispatch<React.SetStateAction<IPackageNew>>;
}> = ({ title, dataArray, selectedPage, userPackage, setUserPackage }) => {
  return (
    <div className="mb-8 space-y-0">
      <p className="text-3xl p-5 font-bold text-center lg:text-start">
        {title}
      </p>
      <div className="overflow-x-scroll flex gap-6 p-5">
        {dataArray.map((data, index) => {
          const {
            name,
            photos,
            rating,
            user_ratings_total,
            vicinity,
            opening_hours,
          } = data;
          return (
            <InfoCard
              key={index}
              name={name}
              photo={photos[0].photo_reference}
              rating={rating}
              user_ratings_total={user_ratings_total}
              vicinity={vicinity}
              open_now={opening_hours?.open_now}
              place={data}
              pageSelected={selectedPage}
              home
              condition={(() => {
                switch (selectedPage) {
                  case PAGE_SELECTED.ACCOMODATIONS:
                    return (
                      userPackage.accomodation === (data as IAccomodationResult)
                    );
                  case PAGE_SELECTED.ATTRACTIONS:
                    return !!userPackage.attractions.includes(
                      data as IAttractionResult
                    );
                  case PAGE_SELECTED.RESTAURANTS:
                    return !!userPackage.restaurants.includes(
                      data as IRestaurantResult
                    );
                  case PAGE_SELECTED.BARS:
                    return !!userPackage.bars.includes(data as IBarResult);
                  case PAGE_SELECTED.NIGHTCLUBS:
                    return !!userPackage.nightclubs.includes(
                      data as INightClubResult
                    );
                  default:
                    break;
                }
              })()}
              callback={() => {
                switch (selectedPage) {
                  case PAGE_SELECTED.ACCOMODATIONS:
                    setUserPackage({
                      ...userPackage,
                      accomodation: data as IAccomodationResult,
                    });
                    break;
                  case PAGE_SELECTED.ATTRACTIONS:
                    const newAttractions = userPackage.attractions.concat(
                      data as IAttractionResult
                    );
                    setUserPackage({
                      ...userPackage,
                      attractions: newAttractions,
                    });
                    break;
                  case PAGE_SELECTED.RESTAURANTS:
                    const newRestaurants = userPackage.restaurants.concat(
                      data as IRestaurantResult
                    );
                    setUserPackage({
                      ...userPackage,
                      restaurants: newRestaurants,
                    });
                    break;
                  case PAGE_SELECTED.BARS:
                    const newBars = userPackage.bars.concat(data as IBarResult);
                    setUserPackage({
                      ...userPackage,
                      bars: newBars,
                    });
                    break;
                  case PAGE_SELECTED.NIGHTCLUBS:
                    const newNightclubs = userPackage.nightclubs.concat(
                      data as INightClubResult
                    );
                    setUserPackage({
                      ...userPackage,
                      nightclubs: newNightclubs,
                    });
                    break;
                  default:
                    break;
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
