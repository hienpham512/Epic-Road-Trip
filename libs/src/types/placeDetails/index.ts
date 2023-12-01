import { IAccomodationResult } from "../accomodations";
import { IAttractionResult } from "../attractions";
import { IBarResult } from "../bars";
import { IEventItems } from "../events";
import { ILocation } from "../locations";
import { INightClubResult } from "../nightClubs";
import { IRestaurantResult } from "../restaurants";

interface IPlaceDetailsParams {
  place_id: string;
}

interface IPlaceDetails {
  html_attributions?: string[];
  status?: string;
  result: IPlaceDetailsResult;
}

interface IPlaceDetailsResult {
  business_status: string;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: IGeometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  international_phone_number: string;
  name: string;
  opening_hours: IOpeningHours;
  photos: IPhoto[];
  place_id: string;
  plus_code: IPlusCode;
  price_level: number;
  rating: number;
  reference: string;
  reviews: IReview[];
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
  website: string;
}

interface IGeometry {
  location: ILocation;
  viewport: IViewport;
}

interface IViewport {
  northeast: ILocation;
  southwest: ILocation;
}

interface IOpeningHours {
  open_now: boolean;
  periods: IPeriod[];
  weekday_text: string[];
}

interface IPeriod {
  close: IClose;
  open: IOpen;
}

interface IClose {
  day: number;
  time: string;
}

interface IOpen {
  day: number;
  time: string;
}

interface IPhoto {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

interface IPlusCode {
  compound_code: string;
  global_code: string;
}

interface IReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export type { IPlaceDetailsParams, IPlaceDetails };
