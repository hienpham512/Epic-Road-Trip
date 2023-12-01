import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  IPlaceDetailsParams,
  IRestaurantBody,
  IRestaurantParams,
} from "@hienpham512/roadtrip";
import { getRestaurantById, getRestaurants } from "../../services";
import { restaurantDetailsSchema, restaurantNextPageSchema, schema } from "./schema";

import { FastifyMongodbOptions } from "@fastify/mongodb";
import HttpError from "../../httpError";
import config from "../../../config";

export const restaurantsPlugin = async (
  fastify: FastifyInstance,
  options: FastifyMongodbOptions
) => {
  fastify.post(
    "/restaurants",
    schema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as IRestaurantParams;
        const body = request.body as IRestaurantBody;

        if (!body.location) {
          return new HttpError(400, "Location is required");
        }
        const paramsService = Object.assign(params, body);

        paramsService.radius = paramsService.radius
          ? paramsService.radius
          : (paramsService.radius = config.options.radius);

        const result = await getRestaurants(paramsService);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );

  fastify.get(
    "/restaurants/nextpage",
    restaurantNextPageSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as IRestaurantParams;

        if (!params.pagetoken) {
          return new HttpError(400, "pagetoken is required");
        }

        params.radius = params.radius
          ? params.radius
          : (params.radius = config.options.radius);

        const result = await getRestaurants(params);
        console.log(result);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );

  fastify.get(
    "/restaurants/:place_id",
    restaurantDetailsSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.params as IPlaceDetailsParams;
        if (!params.place_id) {
          return new HttpError(400, "place_id is required");
        }
        const result = await getRestaurantById(params);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );
};
