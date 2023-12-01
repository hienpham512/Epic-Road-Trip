import { Alpha2Code, isoCountries } from "../contriesCode";
interface IEvent {
  events: IEventItems[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface IEventItems {
  type: string;
  id: string;
  name: string;
  test?: boolean;
  description?: string;
  url: string;
  locale?: string;
  images?: IImage[];
  sales?: ISales;
  dates?: IDates;
  classifications?: IClassifications[];
  promoters?: Array<object>;
  priceRanges?: IPriceRanges[];
  _links?: object;
  _embedded: IEmbedded;
}

interface IEmbedded {
  venues: IVenues[];
}

interface IVenues {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  postalCode: string;
  timezone: string;
  city: ICity;
  state: IState;
  country: ICountry;
  address: IAddress;
  location: ILocation;
  markets: IMarkets[];
  dmas: IDmas[];
  upcomingEvents: IUpcomingEvents;
  _links: object;
}

interface IUpcomingEvents {
  _total: number;
  ticketmaster: number;
}

interface IDmas {
  id: number;
  name: string;
  stateCode: string;
}

interface IMarkets {
  id: number;
  name: string;
  stateCode: string;
}

interface ILocation {
  longitude: string;
  latitude: string;
}

interface IAddress {
  line1: string;
  line2: string;
  line3: string;
}

interface ICountry {
  name: string;
  countryCode: Alpha2Code;
}

interface IState {
  name: string;
  stateCode: string;
}

interface ICity {
  name: string;
}

interface IDates {
  start: {
    localDate: string;
    localTime: string;
    dateTime: string;
    dateTBD: boolean;
    dateTBA: boolean;
    timeTBA: boolean;
    noSpecificTime: boolean;
  };
}

interface IPriceRanges {
  type: string;
  currency: string;
  min: number;
  max: number;
}

interface IClassifications {
  primary: boolean;
  segment: IClassificationsItems;
  genre: IClassificationsItems;
  subGenre: IClassificationsItems;
  type: object;
  subType: object;
  family: boolean;
}

interface IClassificationsItems {
  id: string;
  name: string;
}
interface IImage {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

interface ISales {
  public?: object;
  presales?: object;
}

interface IEventParams {
  latlong: string;
  id?: string;
  keyword?: string;
  attrationId?: string;
  venuedId?: string;
  radius?: string;
  startDateTime?: Date | string;
  endDateTime?: Date | string;
  onsaleStartDateTime?: Date | string;
  onsaleEndDateTime?: Date | string;
  page?: number;
  size?: number;
}

interface IEventBody {
  sort?: {
    prop: SORT_EVENT_PROP;
    order: SORT_ORDER;
  };
  location: {
    lat: number;
    lng: number;
  };
}

export enum SORT_EVENT_PROP {
  NAME = "name",
  DATE = "date",
  RELEVANCE = "relevance",
  DISTANCE = "distance",
  ON_SALE_START_DATE = "onSaleStartDate",
  ID = "id",
  VENUE_NAME = "venueName",
  RANDOM = "random",
}

export enum SORT_ORDER {
  ASC = "asc",
  DESC = "desc",
}

export type {
  IEvent,
  IEventParams,
  IEventBody,
  IEventItems,
  IDates,
  IEmbedded,
  IImage,
  IPriceRanges,
};
