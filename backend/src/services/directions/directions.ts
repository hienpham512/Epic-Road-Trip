import { IDirections, IDirectionsParams } from "@hienpham512/roadtrip";

import HttpError from "../../httpError";
import axios from "axios";
import config from "../../../config";
import { preparedParams } from "../../utils/services";

const type = "bar";

const baseUrl = `${config.services.googleApiDirections.url}?key=${config.services.googleApiDirections.apiKey}&type=${type}`;

export const getDirections: (
  params: IDirectionsParams
) => Promise<IDirections | HttpError> = async (params) => {
  try {
    if (!config.services.googleApi.apiKey) {
      return new HttpError(500, "No API key for accomodations service");
    }
    const result = await axios.get(baseUrl, { params: preparedParams(params) });
    const finalResult: IDirections = result.data ? result.data : [];
    return finalResult;
  } catch (error: any) {
    throw new HttpError(error.statusCode, error.message);
  }
};
