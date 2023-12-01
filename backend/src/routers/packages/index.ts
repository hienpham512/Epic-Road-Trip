import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  IAccomodationParams,
  IAttractionParams,
  IBarParams,
  IEventParams,
  INightClubParams,
  IPackageBody,
  IPackageParams,
  IRestaurantParams,
} from "@hienpham512/roadtrip";
import {
  getAccomodations,
  getAttractions,
  getBars,
  getEvents,
  getNightClubs,
  getRestaurants,
} from "../../services";

import HttpError from "../../httpError";
import { schema } from "./schema";

export const packagesPlugin = async (fastify: FastifyInstance) => {
  fastify.post(
    "/packages",
    schema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as IPackageParams;
        const body = request.body as IPackageBody;

        if (!body.destination) {
          return new HttpError(400, "Destination is required");
        }

        const { destination } = body;
        const paramsService = Object.assign(params, body);

        const events = await getEvents({
          ...paramsService,
          sort: "distance,asc",
          latlong: `${destination.lat},${destination.lng}`,
        } as IEventParams);

        const accomodations = await getAccomodations({
          location: paramsService.destination,
          rankby: "prominence",
          radius: 50000,
        } as IAccomodationParams);

        const attractions = await getAttractions({
          location: paramsService.destination,
          radius: 50000,
          rankby: "prominence",
        } as IAttractionParams);

        const bars = await getBars({
          location: paramsService.destination,
          radius: 50000,
          rankby: "prominence",
        } as IBarParams);

        const nightClubs = await getNightClubs({
          location: paramsService.destination,
          radius: 50000,
          rankby: "prominence",
        } as INightClubParams);

        const restaurants = await getRestaurants({
          location: paramsService.destination,
          radius: 50000,
          rankby: "prominence",
        } as IRestaurantParams);

        let randomEvents: Array<number> = [];
        let randomAccomodations: Array<number> = [];

        let randomAttractions: Array<number> = [];
        let randomRestaurants: Array<number> = [];
        let randomBars: Array<number> = [];
        let randomNightClubs: Array<number> = [];

        for (let i = 0; i < 2; i++) {
          randomEvents = [
            ...randomEvents,
            Math.floor(Math.random() * events.events.length),
          ];
        }

        for (let i = 0; i < 3; i++) {
          randomAccomodations = [
            ...randomAccomodations,
            Math.floor(Math.random() * accomodations.results.length),
          ];
        }

        for (let i = 0; i < 3; i++) {
          randomAttractions = [
            ...randomAttractions,
            Math.floor(Math.random() * attractions.results.length),
          ];
          randomRestaurants = [
            ...randomRestaurants,
            Math.floor(Math.random() * restaurants.results.length),
          ];
        }
        for (let i = 0; i < 2; i++) {
          randomBars = [
            ...randomBars,
            Math.floor(Math.random() * bars.results.length),
          ];
          randomNightClubs = [
            ...randomNightClubs,
            Math.floor(Math.random() * nightClubs.results.length),
          ];
        }

        return {
          events: randomEvents.map((event) => events.events[event]),
          accomodations: randomAccomodations.map(
            (accomodation) => accomodations.results[accomodation]
          ),
          attractions: randomAttractions.map(
            (attraction) => attractions.results[attraction]
          ),
          restaurants: randomRestaurants.map(
            (restaurant) => restaurants.results[restaurant]
          ),
          bars: randomBars.map((bar) => bars.results[bar]),
          nightClubs: randomNightClubs.map(
            (nightClub) => nightClubs.results[nightClub]
          ),
        };
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );
};
