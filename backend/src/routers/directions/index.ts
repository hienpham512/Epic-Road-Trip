import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IDirectionsBody, IDirectionsParams } from "@hienpham512/roadtrip";
import { getDirections, getRestaurants } from "../../services";

import { FastifyMongodbOptions } from "@fastify/mongodb";
import HttpError from "../../httpError";
import config from "../../../config";
import { schema } from "./schema";

export const directionsPlugin = async (
  fastify: FastifyInstance,
  options: FastifyMongodbOptions
) => {
  fastify.post(
    "/directions",
    schema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = request.body as IDirectionsBody;

        if (!body.origin || !body.destination) {
          return new HttpError(400, "Missing origin or destination");
        }

        const defaultParams = {
          mode: "transit",
          transit_mode: "train|bus|subway",
        };

        const paramsService: IDirectionsParams = Object.assign(
          body,
          defaultParams
        );

        const result = await getDirections(paramsService);
        return result;
      } catch (error: any) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  );
};
