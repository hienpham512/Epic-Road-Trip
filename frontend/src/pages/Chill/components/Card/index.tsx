import {
  IBarResult,
  INightClubResult,
  IRestaurantResult,
} from "@hienpham512/roadtrip";
import InfoCard from "@/components/InfoCard";
import React from "react";
import { PAGE_SELECTED } from "../..";
interface ICardProps {
  place: IRestaurantResult | IBarResult | INightClubResult;
  pageSelected: PAGE_SELECTED;
}

const Card: React.FC<ICardProps> = ({ place, pageSelected }) => {
  const { photos, name, rating, user_ratings_total, opening_hours, vicinity } =
    place;

  return (
    <InfoCard
      photo={photos[0].photo_reference}
      name={name}
      rating={rating}
      user_ratings_total={user_ratings_total}
      open_now={opening_hours?.open_now}
      vicinity={vicinity}
      place={place}
      pageSelected={pageSelected}
    />
  );
};

export default Card;
