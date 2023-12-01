import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IBarBody, IBarParams, IPlaceDetailsParams } from "@hienpham512/roadtrip";
import { barDetailsSchema, barNextPageSchema, schema } from "./schema";
import { getBarById, getBars } from "../../services";

import { FastifyMongodbOptions } from "@fastify/mongodb";
import HttpError from "../../httpError";
import config from "../../../config";

export const barsPlugin = async (
  fastify: FastifyInstance,
  options: FastifyMongodbOptions
) => {
  fastify.post(
    "/bars",
    schema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as IBarParams;
        const body = request.body as IBarBody;
        if (!body.location) {
          return new HttpError(400, "Location is required");
        }
        const paramsService = Object.assign(params, body);

        paramsService.radius = paramsService.radius
          ? paramsService.radius
          : (paramsService.radius = config.options.radius);

        const result = await getBars(paramsService);
        return result;
      } catch (error) {
        throw error;
      }
    }
  );

  fastify.get(
    "/bars/nextpage",
    barNextPageSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as IBarParams;
        if (!params.pagetoken) {
          return new HttpError(400, "pagetoken is required");
        }

        params.radius = params.radius
          ? params.radius
          : (params.radius = config.options.radius);

        const result = await getBars(params);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );

  fastify.get(
    "/bars/:place_id",
    barDetailsSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.params as IPlaceDetailsParams;
        if (!params.place_id) {
          throw new HttpError(400, "place_id is required");
        }

        const result = await getBarById(params);
        return result;
      } catch (error: any) {
        throw new HttpError(error.codeStatus, error.message);
      }
    }
  );
};
