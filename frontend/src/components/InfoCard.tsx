import { PAGE_SELECTED } from "@/pages/Chill";
import {
  CheckBadgeIcon as CheckIcon,
  MapPinIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon as XIcon,
} from "@heroicons/react/24/solid";
import {
  IAccomodationResult,
  IAttractionResult,
  IBarResult,
  INightClubResult,
  IRestaurantResult,
} from "@hienpham512/roadtrip";
import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import CartButton from "./CartButton";

interface IInfoCardProps {
  place:
    | IAttractionResult
    | IAccomodationResult
    | IBarResult
    | IRestaurantResult
    | INightClubResult;
  pageSelected: PAGE_SELECTED;
  photo: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  vicinity: string;
  open_now: boolean;
  home?: boolean;
  condition?: boolean;
  callback?: () => void;
}

const InfoCard: React.FC<IInfoCardProps> = ({
  photo,
  name,
  rating,
  user_ratings_total,
  vicinity,
  open_now,
  place,
  home = false,
  condition = false,
  pageSelected,
  callback = () => {},
}) => {
  return (
    <Link
      className="min-w-[23rem] md:min-w-[20rem] lg:min-w-[28rem] space-y-3 p-3 shadow-md rounded-xl transition-all ease-in-out duration-400 border md:justify-between md:flex md:flex-col lg:hover:scale-105"
      role="button"
      target="_blank"
      rel="noopener noreferrer"
      to={(() => {
        if (pageSelected === PAGE_SELECTED.ATTRACTIONS)
          return `/home/details/attractions/${place.place_id}`;
        if (pageSelected === PAGE_SELECTED.BARS)
          return `/home/details/bars/${place.place_id}`;
        if (pageSelected === PAGE_SELECTED.NIGHTCLUBS)
          return `/home/details/nightclubs/${place.place_id}`;
        if (pageSelected === PAGE_SELECTED.RESTAURANTS)
          return `/home/details/restaurants/${place.place_id}`;
        if (pageSelected === PAGE_SELECTED.ACCOMODATIONS)
          return `/home/details/accomodations/${place.place_id}`;
        return ``;
      })()}
    >
      {photo && (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo}&sensor=false&maxheight=${400}&maxwidth=${400}&key=${
            import.meta.env.VITE_GOOGLE_MAP_API_KEY
          }`}
          className="rounded-xl shadow-sm object-cover w-full h-80"
        />
      )}
      <div className="space-y-3 relative">
        {name && <p className="text-xl font-bold line-clamp-1">{name}</p>}
        {rating && (
          <div className="flex items-start gap-3">
            <StarRatings
              rating={rating}
              starRatedColor="gold"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="2px"
            />
            <p className="text-lg font-medium">
              {rating.toFixed(1)}{" "}
              <span className="text-gray-400 md:text-sm">
                ({user_ratings_total} reviews)
              </span>
            </p>
          </div>
        )}
        {vicinity && (
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-6 text-blue-600" />{" "}
            <p className="font-medium line-clamp-1">{vicinity}</p>
          </div>
        )}
      </div>
      <div className="w-full flex justify-between items-center gap-1">
        <div className="flex items-center gap-1">
          {open_now ? (
            <>
              <CheckIcon className="h-7 text-green-600" />
              <p className="text-green-600 font-medium">Open now</p>
            </>
          ) : (
            <>
              <XIcon className="h-7 text-red-600" />
              <p className="text-red-600 font-medium">Closed now</p>
            </>
          )}
        </div>
        {home ? (
          <div
            className="flex gap-1"
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              callback();
            }}
          >
            {condition ? (
              <MinusCircleIcon className="h-6 text-red-600" />
            ) : (
              <PlusCircleIcon className="h-6 text-green-600" />
            )}
            <p className="font-normal">{condition ? "Remove" : "Add"}</p>
          </div>
        ) : (
          <CartButton
            pageSelected={PAGE_SELECTED.ACCOMODATIONS}
            place={place}
          />
        )}
      </div>
    </Link>
  );
};

export default InfoCard;
