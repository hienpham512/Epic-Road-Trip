import {
  IAccomodationResult,
  IAttractionResult,
  IBarResult,
  IEventItems,
  INightClubResult,
  IRestaurantResult,
} from "@hienpham512/roadtrip";
import { Icon } from "@iconify/react";
import { PAGE_SELECTED } from "../pages/Chill/index";
import React from "react";
import { useCart } from "../contexts/cartContext";
import { ShoppingCartIcon as CartIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon as DarkCartIcon } from "@heroicons/react/24/solid";

interface ICartButtonProps {
  place?:
    | IAttractionResult
    | IAccomodationResult
    | IBarResult
    | IRestaurantResult
    | INightClubResult;
  pageSelected: PAGE_SELECTED;
  event?: IEventItems;
}

const CartButton: React.FC<ICartButtonProps> = ({
  place,
  pageSelected,
  event,
}) => {
  const {
    accomodations,
    attractions,
    restaurants,
    bars,
    events,
    nightclubs,
    // packages,
    setAccomodations,
    setAttractions,
    setBars,
    setEvents,
    setNightclubs,
    // setPackages,
    setRestaurants,
  } = useCart();

  const [isInCart, setIsInCart] = React.useState<boolean>(false);

  const checkInCart = () => {
    let placeFound;
    if (pageSelected === PAGE_SELECTED.RESTAURANTS) {
      placeFound = restaurants.find((p) => p.place_id === place?.place_id);
    } else if (pageSelected === PAGE_SELECTED.BARS) {
      placeFound = bars.find((p) => p.place_id === place?.place_id);
    } else if (pageSelected === PAGE_SELECTED.NIGHTCLUBS) {
      placeFound = nightclubs.find((p) => p.place_id === place?.place_id);
    } else if (pageSelected === PAGE_SELECTED.ACCOMODATIONS) {
      placeFound = accomodations.find((p) => p.place_id === place?.place_id);
    } else if (pageSelected === PAGE_SELECTED.ATTRACTIONS) {
      placeFound = attractions.find((p) => p.place_id === place?.place_id);
    } else {
      if (event) {
        placeFound = events.find((p) => p.id === event.id);
      }
    }
    return placeFound;
  };

  React.useEffect(() => {
    const placeFound = checkInCart();
    setIsInCart(!!placeFound);
  }, [accomodations, attractions, restaurants, bars, events, nightclubs]);

  const handleSetCart = () => {
    const placeFound = checkInCart();
    if (pageSelected === PAGE_SELECTED.RESTAURANTS)
      setRestaurants(
        placeFound
          ? [...restaurants.filter((p) => p.place_id !== place?.place_id)]
          : [...restaurants, place as IRestaurantResult]
      );
    else if (pageSelected === PAGE_SELECTED.BARS)
      setBars(
        placeFound
          ? [...bars.filter((p) => p.place_id !== place?.place_id)]
          : [...bars, place as IBarResult]
      );
    else if (pageSelected === PAGE_SELECTED.NIGHTCLUBS)
      setNightclubs(
        placeFound
          ? [...nightclubs.filter((p) => p.place_id !== place?.place_id)]
          : [...nightclubs, place as INightClubResult]
      );
    else if (pageSelected === PAGE_SELECTED.ACCOMODATIONS)
      setAccomodations(
        placeFound
          ? [...accomodations.filter((p) => p.place_id !== place?.place_id)]
          : [...accomodations, place as IAccomodationResult]
      );
    else if (pageSelected === PAGE_SELECTED.ATTRACTIONS)
      setAttractions(
        placeFound
          ? [...attractions.filter((p) => p.place_id !== place?.place_id)]
          : [...attractions, place as IAttractionResult]
      );
    else if (event)
      setEvents(
        placeFound
          ? [...events.filter((p) => p.id !== event.id)]
          : [...events, event]
      );
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSetCart();
      }}
      className={`flex gap-1 items-center ${isInCart ? "" : "hover:underline"}`}
      role="button"
      disabled={isInCart}
    >
      {isInCart ? (
        <DarkCartIcon className="h-6 text-green-500" />
      ) : (
        <CartIcon className="h-6" />
      )}
      <p className={`${isInCart ? "text-green-500 font-medium" : ""}`}>
        {isInCart ? "In cart" : "Add to cart"}
      </p>
    </button>
  );
};

export default CartButton;
