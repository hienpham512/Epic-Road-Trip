import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  INightClubBody,
  INightClubParams,
  IPlaceDetails,
  IPlaceDetailsParams,
} from "@hienpham512/roadtrip";
import { getNightClubById, getNightClubs } from "../../services";
import { nightClubsNextPageSchema, schema } from "./schema";

import { FastifyMongodbOptions } from "@fastify/mongodb";
import HttpError from "../../httpError";
import config from "../../../config";

export const nightClubsPlugin = async (
  fastify: FastifyInstance,
  options: FastifyMongodbOptions
) => {
  fastify.post(
    "/nightclubs",
    schema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as INightClubParams;
        const body = request.body as INightClubBody;
        if (!body.location) {
          return new HttpError(400, "Location is required");
        }
        const paramsService = Object.assign(params, body);
        paramsService.radius = paramsService.radius
          ? paramsService.radius
          : (paramsService.radius = config.options.radius);

        const result = await getNightClubs(paramsService);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );

  fastify.get(
    "/nightclubs/nextpage",
    nightClubsNextPageSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as INightClubParams;
        if (!params.pagetoken) {
          return new HttpError(400, "pagetoken is required");
        }

        params.radius = params.radius
          ? params.radius
          : (params.radius = config.options.radius);
        const result = await getNightClubs(params);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );

  fastify.get(
    "/nightclubs/:place_id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.params as IPlaceDetailsParams;
        if (!params.place_id) {
          return new HttpError(400, "place_id is required");
        }
        const result = await getNightClubById(params);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );
};
