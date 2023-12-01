interface ILocation {
  lat: number;
  lng: number;
}

export enum PlaceType {
  RESTAURANTS = "restaurants",
  BARS = "bars",
  NIGHTCLUBS = "nightclubs",
  ACCOMODATIONS = "accomodations",
  EVENTS = "evenst",
  ATTRACTIONS = "attractions",
}

export type { ILocation};
