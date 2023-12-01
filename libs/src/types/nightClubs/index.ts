import { ILocation } from "../locations";

interface INightClub {
  html_attributions: string[];
  next_page_token: string;
  results: INightClubResult[];
  status: string;
}

interface INightClubResult {
  business_status: string;
  geometry: IGeometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;

  opening_hours: IOpeningHours;
  photos: IPhoto[];
  place_id: string;
  plus_code: IPlusCode;
  price_level: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
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

interface INightClubParams {
  radius?: number;
  keyword?: string;
  opennow?: boolean;
  pagetoken?: string;
  rankby?: "prominence" | "distance";

}

interface INightClubBody {
  location: ILocation;
}

export type { INightClubParams, INightClubBody, INightClub, INightClubResult };
