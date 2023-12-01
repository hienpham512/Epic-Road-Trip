import {
  IAccomodationResult,
  IAttractionResult,
  IBarResult,
  IEventItems,
  INightClubResult,
  IRestaurantResult,
} from "@hienpham512/roadtrip";
import React, { useEffect } from "react";

import { Icon } from "@iconify/react";
import { useCart } from "@/contexts/cartContext";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import { useNavigate } from "react-router-dom";

interface ICartModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}

const Cart: React.FC<ICartModalProps> = ({ setShowModal, showModal }) => {
  const cartRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(cartRef, () => setShowModal(false));

  const {
    accomodations,
    events,
    attractions,
    restaurants,
    bars,
    nightclubs,
    packages,
    setAccomodations,
    setAttractions,
    setBars,
    setEvents,
    setNightclubs,
    setPackages,
    setRestaurants,
  } = useCart();

  const [emptyCart, setEmptyCart] = React.useState<boolean>(true);
  useEffect(() => {
    if (
      accomodations ||
      events.length > 0 ||
      attractions.length > 0 ||
      restaurants.length > 0 ||
      bars.length > 0 ||
      nightclubs.length > 0 ||
      packages.length > 0
    )
      setEmptyCart(false);
    else setEmptyCart(true);
  }, [
    accomodations,
    events,
    attractions,
    restaurants,
    bars,
    nightclubs,
    packages,
  ]);
  const navigate = useNavigate();
  return (
    <div
      ref={cartRef}
      className={`z-50 fixed top-0 right-0 h-screen w-[70%] md:w-[45%] lg:w-[35%] bg-white border rounded-xl shadow-lg transition-all ease-in-out origin-top-right ${
        showModal ? "scale-100" : "scale-0"
      }`}
    >
      <div className="flex items-center justify-between p-3 border-b-2">
        <span className="font-semibold">Your cart</span>
        <div
          onClick={() => setShowModal(false)}
          className="rounded-full p-2 hover:bg-slate-300 hover:text-white"
        >
          <Icon icon="ic:baseline-close" className="w-6 h-6" />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 p-3">
          {emptyCart ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Icon
                icon="ic:baseline-shopping-cart"
                className="w-20 h-20 text-gray-300"
              />
              <span className="text-gray-300">Your cart is empty</span>
            </div>
          ) : (
            <div className="h-[80vh] overflow-y-scroll scrollbar-hide space-y-4 bg-gray-100 p-2 rounded-lg">
              {accomodations.length > 0 &&
                accomodations.map((accomodation, index) => (
                  <Product
                    key={index}
                    name={accomodation.name}
                    value={accomodations}
                    address={accomodation.vicinity}
                    image={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${
                      accomodation.photos?.[0].photo_reference
                    }&sensor=false&maxheight=${400}&maxwidth=${400}&key=${
                      import.meta.env.VITE_GOOGLE_MAP_API_KEY
                    }`}
                    action={() =>
                      setAccomodations([
                        ...accomodations.filter(
                          (p) => p.place_id !== accomodation.place_id
                        ),
                      ])
                    }
                  />
                ))}
              {events.length > 0 &&
                events.map((event, index) => (
                  <Product
                    key={index}
                    name={event.name}
                    value={events}
                    address={`${event._embedded.venues[0].name}, ${event._embedded.venues[0].postalCode}, ${event._embedded.venues[0].city.name} ${event._embedded.venues[0].country.name}`}
                    image={event.images ? event.images[0].url : undefined}
                    action={() =>
                      setEvents([...events.filter((p) => p.id !== event.id)])
                    }
                  />
                ))}
              {attractions.length > 0 &&
                attractions.map((attraction, index) => (
                  <Product
                    key={index}
                    name={attraction.name}
                    value={attractions}
                    address={attraction.vicinity}
                    image={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${
                      attraction.photos?.[0].photo_reference
                    }&sensor=false&maxheight=${400}&maxwidth=${400}&key=${
                      import.meta.env.VITE_GOOGLE_MAP_API_KEY
                    }`}
                    action={() =>
                      setAttractions([
                        ...attractions.filter(
                          (p) => p.place_id !== attraction.place_id
                        ),
                      ])
                    }
                  />
                ))}
              {restaurants.length > 0 &&
                restaurants.map((restaurant, index) => (
                  <Product
                    key={index}
                    name={restaurant.name}
                    value={restaurants}
                    address={restaurant.vicinity}
                    image={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${
                      restaurant.photos?.[0].photo_reference
                    }&sensor=false&maxheight=${400}&maxwidth=${400}&key=${
                      import.meta.env.VITE_GOOGLE_MAP_API_KEY
                    }`}
                    action={() =>
                      setRestaurants([
                        ...restaurants.filter(
                          (p) => p.place_id !== restaurant.place_id
                        ),
                      ])
                    }
                  />
                ))}
              {bars.length > 0 &&
                bars.map((bar, index) => (
                  <Product
                    key={index}
                    name={bar.name}
                    value={bars}
                    address={bar.vicinity}
                    image={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${
                      bar.photos?.[0].photo_reference
                    }&sensor=false&maxheight=${400}&maxwidth=${400}&key=${
                      import.meta.env.VITE_GOOGLE_MAP_API_KEY
                    }`}
                    action={() =>
                      setBars([
                        ...bars.filter((p) => p.place_id !== bar.place_id),
                      ])
                    }
                  />
                ))}
              {nightclubs.length > 0 &&
                nightclubs.map((nightclub, index) => (
                  <Product
                    key={index}
                    name={nightclub.name}
                    value={nightclubs}
                    address={nightclub.vicinity}
                    image={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${
                      nightclub.photos?.[0].photo_reference
                    }&sensor=false&maxheight=${400}&maxwidth=${400}&key=${
                      import.meta.env.VITE_GOOGLE_MAP_API_KEY
                    }`}
                    action={() =>
                      setNightclubs([
                        ...nightclubs.filter(
                          (p) => p.place_id !== nightclub.place_id
                        ),
                      ])
                    }
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      {!emptyCart && (
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white py-2 w-full max-w-xs rounded-lg xl:py-3"
            onClick={() => {
              setShowModal(false);
              navigate("payment");
            }}
          >
            Payment
          </button>
        </div>
      )}
    </div>
  );
};

interface IProductProps {
  name: string;
  value:
    | IAccomodationResult[]
    | IBarResult[]
    | IRestaurantResult[]
    | INightClubResult[]
    | IEventItems[]
    | IAttractionResult[];
  address: string;
  image?: string;
  empty?: boolean;
  action: () => void;
}

const Product: React.FC<IProductProps> = ({
  name,
  value,
  address,
  image,
  empty = false,
  action,
}) => {
  return (
    <div className="w-full border bg-white rounded-lg shadow-lg flex items-center justify-between p-4 hover:opacity-50 duration-300">
      {!empty && (
        <>
          <div className="flex items-center gap-2">
            {image ? (
              <img
                src={image}
                alt="hotel_photo"
                className="w-12 h-12 rounded-lg"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-lg" />
            )}

            <div className="flex flex-col gap-1 max-w-sm">
              <span className="font-bold text-xs md:text-lg line-clamp-1">
                {name}
              </span>
              <span className="text-[8px] md:text-sm line-clamp-1">
                {address}
              </span>
            </div>
          </div>

          <button
            onClick={action}
            className="rounded-full p-2 hover:text-white hover:bg-red-700"
          >
            <Icon icon="tabler:trash" className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
