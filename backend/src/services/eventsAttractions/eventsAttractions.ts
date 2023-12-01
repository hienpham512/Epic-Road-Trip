import {
  IAttraction,
  IAttractionParams,
  IEvent,
  IEventItems,
  IEventParams,
  IPlaceDetails,
  IPlaceDetailsParams,
} from "@hienpham512/roadtrip";

import HttpError from "../../httpError";
import axios from "axios";
import config from "../../../config";
import { preparedParams } from "../../utils/services";

const baseUrlEvent = `${config.services.events.url}?locale=*&apikey=${config.services.events.apiKey}&`;

export const getEvents: (params: IEventParams) => Promise<IEvent> = async (
  params: IEventParams
) => {
  try {
    if (!config.services.events.apiKey) {
      throw new HttpError(500, "No API key for events service");
    }
    const result = await axios.get(baseUrlEvent, {
      params: preparedParams(params),
    });
    const finalResult: IEvent = {
      events: result.data._embedded ? result.data._embedded.events : [],
      page: result.data.page,
    };
    return finalResult;
  } catch (error: any) {
    throw new HttpError(error.statusCode, error.message);
  }
};

export const getEventById: (
  params: IPlaceDetailsParams
) => Promise<IEventItems> = async (params: IPlaceDetailsParams) => {
  try {
    if (!config.services.events.apiKey) {
      throw new HttpError(500, "No API key for events service");
    }
    if (!params.place_id) {
      throw new HttpError(404, "place_id is required");
    }
    const result = await axios.get(baseUrlEvent, {
      params: { ...preparedParams(params), id: params.place_id },
    });
    if (!result.data._embedded) {
      throw new HttpError(404, `event with id ${params.place_id} not found`);
    }
    const finalResult: IEventItems = result.data._embedded.events[0];
    
    return finalResult;
  } catch (error: any) {
    throw new HttpError(error.statusCode, error.message);
  }
};

const type = "tourist_attraction";

const baseUrlAttractions = `${config.services.googleApi.url}?key=${config.services.googleApi.apiKey}&type=${type}`;
const baseUrlPlaceDetails = `${config.services.googleApiPlaceDetails.url}?key=${config.services.googleApiPlaceDetails.apiKey}`;

export const getAttractions: (
  params: IAttractionParams
) => Promise<IAttraction> = async (params: IAttractionParams) => {
  try {
    if (!config.services.googleApi.apiKey) {
      throw new HttpError(500, "No API key for accomodations service");
    }
    const result = await axios.get(baseUrlAttractions, {
      params: preparedParams(params),
    });
    const finalResult: IAttraction = result.data ? result.data : [];
    return finalResult;
  } catch (error: any) {
    throw new HttpError(error.statusCode, error.message);
  }
};

export const getAttractionById: (
  params: IPlaceDetailsParams
) => Promise<IPlaceDetails> = async (params: IPlaceDetailsParams) => {
  try {
    if (!config.services.googleApi.apiKey) {
      throw new HttpError(500, "No API key for accomodations service");
    }
    if (!params.place_id) {
      throw new HttpError(404, "place_id is required");
    }
    const result = await axios.get(baseUrlPlaceDetails, {
      params: preparedParams(params),
    });

    if (!result.data) {
      throw new HttpError(
        404,
        `attraction with id ${params.place_id} not found`
      );
    }
    const finalResult: IPlaceDetails = result.data;
    return finalResult;
  } catch (error: any) {
    throw new HttpError(error.statusCode, error.message);
  }
};
