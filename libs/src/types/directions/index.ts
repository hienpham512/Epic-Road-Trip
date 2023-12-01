import { ILocation } from "../locations";

interface IDirections {
  geocoded_waypoints: IGeocoder[];
  routes: IRoutes[];
  status: string;
}

interface IGeocoder {
  geocoder_status: string;
  place_id: string;
  types: string[];
}

interface IRoutes {
  bounds: IBounds;
  legs: ILegs[];
  overview_polyline: IPolyline;
  summary: string;
  warnings: string[];
  waypoint_order: number[];
}

interface IBounds {
  northeast: ILocation;
  southwest: ILocation;
}

interface ILegs {
  distance: IDistance;
  duration: IDuration;
  end_address: string;
  end_location: ILocation;
  start_address: string;
  start_location: ILocation;
  steps: ISteps[];
  traffic_speed_entry: string[];
  via_waypoint: string[];
}

interface IDistance {
  text: string;
  value: number;
}

interface IDuration {
  text: string;
  value: number;
}

interface ISteps {
  distance: IDistance;
  duration: IDuration;
  end_location: ILocation;
  html_instructions: string;
  maneuver: string;
  polyline: IPolyline;
  start_location: ILocation;
  travel_mode: string;
  steps: ISteps[];
}

interface IPolyline {
  points: string;
}

interface IDirectionsParams {
    mode: string;
    transit_mode: string;
}

interface IDirectionsBody {
  origin: ILocation;
  destination: ILocation;
}

export type { IDirections, IDirectionsBody, IDirectionsParams };
