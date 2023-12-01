import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  IAttractionBody,
  IAttractionParams,
  IEventBody,
  IEventParams,
  IPlaceDetailsParams,
} from "@hienpham512/roadtrip";
import {
  attractionDetailsSchema,
  attractionNextPageSchema,
  eventDetailsSchema,
  eventNextPageSchema,
  schemaAttraction,
  schemaEvent,
} from "./schema";
import {
  getAttractionById,
  getAttractions,
  getEventById,
  getEvents,
} from "../../services";

import { FastifyMongodbOptions } from "@fastify/mongodb";
import HttpError from "../../httpError";
import config from "../../../config";

export const eventsPlugin = async (
  fastify: FastifyInstance,
  options: FastifyMongodbOptions
) => {
  fastify.post(
    "/events",
    schemaEvent,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as IEventParams;
        const body = request.body as IEventBody;

        if (!body.location) {
          throw new HttpError(400, "location code is required");
        }

        const paramsService = Object.assign(params, body);

        paramsService.size = paramsService.size
          ? paramsService.size
          : (paramsService.size = 20);
        paramsService.page ? paramsService.page : (paramsService.page = 0);

        const result = await getEvents({
          ...paramsService,
          latlong: paramsService.location,
        } as unknown as IEventParams);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );

  fastify.post(
    "/events/nextpage",
    // eventNextPageSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as IEventParams;
        const body = request.body as IEventBody;

        if (!body.location) {
          throw new HttpError(400, "location code is required");
        }

        if (!params.page) {
          throw new HttpError(400, "page is required");
        }

        const result = await getEvents(params);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );

  fastify.get(
    "/events/:place_id",
    eventDetailsSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.params as IPlaceDetailsParams;
        if (!params.place_id) {
          throw new HttpError(400, "place_id is required");
        }
        const result = await getEventById(params);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );

  fastify.post(
    "/attractions",
    schemaAttraction,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as IAttractionParams;
        const body = request.body as IAttractionBody;

        if (!body.location) {
          throw new HttpError(400, "Location is required");
        }

        const paramsService = Object.assign(params, body);

        paramsService.radius = paramsService.radius
          ? paramsService.radius
          : (paramsService.radius = config.options.radius);

        const result = await getAttractions(paramsService);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );

  fastify.get(
    "/attractions/nextpage",
    attractionNextPageSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.query as IAttractionParams;
        const body = request.body as IAttractionBody;

        if (!params.pagetoken) {
          throw new HttpError(400, "pagetoken is required");
        }

        params.radius = params.radius
          ? params.radius
          : (params.radius = config.options.radius);

        const result = await getAttractions(params);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );

  fastify.get(
    "/attractions/:place_id",
    attractionDetailsSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const params = request.params as IPlaceDetailsParams;
        
        if (!params.place_id) {
          throw new HttpError(400, "place_id is required");
        }
        const result = await getAttractionById(params);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );
};
