import { INightClub, INightClubParams, IPlaceDetails, IPlaceDetailsParams } from "@hienpham512/roadtrip";

import HttpError from "../../httpError";
import axios from "axios";
import config from "../../../config";
import { preparedParams } from "../../utils/services";

const type = "night_club";

const baseUrl = `${config.services.googleApi.url}?key=${config.services.googleApi.apiKey}&type=${type}`;
const baseUrlPlaceDetails = `${config.services.googleApiPlaceDetails.url}?key=${config.services.googleApiPlaceDetails.apiKey}`;

export const getNightClubs: (
  params: INightClubParams
) => Promise<INightClub> = async (params: INightClubParams) => {
  try {
    if (!config.services.googleApi.apiKey) {
      throw new HttpError(500, "No API key for accomodations service");
    }
    const result = await axios.get(baseUrl, { params: preparedParams(params) });
    const finalResult: INightClub = result.data ? result.data : [];
    return finalResult;
  } catch (error: any) {
    throw new HttpError(error.statusCode, error.message);
  }
};

export const getNightClubById: (
  params: IPlaceDetailsParams
) => Promise<IPlaceDetails> = async (params: IPlaceDetailsParams) => {
  try {
    const result = await axios.get(baseUrlPlaceDetails, {
      params: preparedParams(params),
    });
    if (!config.services.googleApiPlaceDetails.apiKey) {
      throw new HttpError(500, "No API key for accomodations service");
    }
    if (!result.data) {
      throw new HttpError(404, `night club with id ${params.place_id} not found`);
    }
    const finalResult: IPlaceDetails = result.data;
    return finalResult;
  } catch (error: any) {
    throw new HttpError(error.statusCode, error.message);
  }
};
