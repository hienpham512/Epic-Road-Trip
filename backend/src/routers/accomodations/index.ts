import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  IAccomodationBody,
  IAccomodationParams,
  IPlaceDetailsParams,
} from "@hienpham512/roadtrip";
import { accomodationDetailSchema, accomodationNextPageSchema, schema } from "./schema";
import { getAccomodationById, getAccomodations } from "../../services";

import { FastifyMongodbOptions } from "@fastify/mongodb";
import HttpError from "../../httpError";
import config from "../../../config";

export const accomodationsPlugin = async (
  fastify: FastifyInstance,
  options: FastifyMongodbOptions
) => {
  fastify.post(
    "/accomodations",
    schema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as IAccomodationParams;
        const body = request.body as IAccomodationBody;
        if (!body.location) {
          return new HttpError(400, "Location is required");
        }
        const paramsService = Object.assign(params, body);

        paramsService.radius = paramsService.radius
          ? paramsService.radius
          : (paramsService.radius = config.options.radius);

        const result = await getAccomodations(paramsService);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );

  fastify.get(
    "/accomodations/nextpage",
    accomodationNextPageSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as IAccomodationParams;
        if (!params.pagetoken) {
          return new HttpError(400, "pagetoken is required");
        }

        params.radius = params.radius
          ? params.radius
          : (params.radius = config.options.radius);
          
        const result = await getAccomodations(params);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );

  fastify.get(
    "/accomodations/:place_id",
    accomodationDetailSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.params as IPlaceDetailsParams;
        if (!params.place_id) {
          throw new HttpError(400, "place_id is required");
        }

        const result = await getAccomodationById(params);
        return result;
      } catch (error: any) {
        throw new HttpError(error.codeStatus, error.message);
      }
    }
  );
};
