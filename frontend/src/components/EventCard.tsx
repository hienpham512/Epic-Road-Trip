import { PAGE_SELECTED } from "@/pages/Chill";
import {
  CalendarDaysIcon,
  CurrencyEuroIcon,
  MapPinIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import {
  IDates,
  IEmbedded,
  IEventItems,
  IImage,
  IPriceRanges,
} from "@hienpham512/roadtrip";
import React from "react";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";

interface IEventCardProps {
  name: string;
  description?: string;
  url: string;
  images?: IImage[];
  priceRanges?: IPriceRanges[];
  _embedded: IEmbedded;
  dates?: IDates;
  home?: boolean;
  event: IEventItems;
  condition?: boolean;
  callback?: () => void;
}

const EventCard: React.FC<IEventCardProps> = ({
  url,
  images,
  name,
  description,
  priceRanges,
  _embedded,
  dates,
  home = false,
  event,
  condition = false,
  callback = () => {},
}) => {
  return (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      className="space-y-3 p-3 shadow-md rounded-xl transition-all ease-in-out duration-400 border min-w-[23rem] md:min-w-[25rem] lg:min-w-[28rem]"
      role="button"
    >
      {images?.[0].url && (
        <img
          src={images?.sort((a, b) => b.width - a.width)?.[0].url}
          alt=""
          className="rounded-xl shadow-sm object-cover h-80"
        />
      )}
      {name && <h1 className="text-xl font-bold line-clamp-1">{name}</h1>}
      {description && !home && (
        <p className="line-clamp-5 tracking-normal">{description}</p>
      )}
      {priceRanges && (
        <div className="flex items-center gap-2">
          <CurrencyEuroIcon className="h-6 text-lime-600" />
          <p className="font-medium">
            Ticket Price{"  "}
            <span className="font-bold">
              {(priceRanges[0].max + priceRanges[0].min) / 2}€
            </span>
          </p>
        </div>
      )}
      {_embedded &&
        _embedded.venues.map((venue, index) => {
          return (
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-6 text-blue-600" />
              <p key={index} className="font-medium">
                {venue.city.name} - {venue.name}
              </p>
            </div>
          );
        })}
      <div className="flex justify-between">
        {dates && (
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-6" />
            <p className="font-medium">
              {dates.start.localDate} - {dates.start.localTime}
            </p>
          </div>
        )}
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
          <CartButton pageSelected={PAGE_SELECTED.EVENTS} event={event} />
        )}
      </div>
    </Link>
  );
};

export default EventCard;
