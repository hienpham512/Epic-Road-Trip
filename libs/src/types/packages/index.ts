import { IAccomodation, IAccomodationResult } from "../accomodations";
import { IAttraction, IAttractionResult } from "../attractions";
import { IBar, IBarResult } from "../bars";
import { IEvent, IEventItems, IEventParams } from "../events";
import { INightClub, INightClubResult } from "../nightClubs";
import { IRestaurant, IRestaurantResult } from "../restaurants";

import { ILocation } from "../locations";

interface IPackage {
  events: IEventItems[];
  accomodations: IAccomodationResult[];
  nightClubs: INightClubResult[];
  restaurants: IRestaurantResult[];
  attractions: IAttractionResult[];
  bars: IBarResult[];
}

interface IPackageParams {
  destination: string;
}

interface IPackageBody {
  destination: ILocation;
}

export type { IPackage, IPackageParams, IPackageBody };
