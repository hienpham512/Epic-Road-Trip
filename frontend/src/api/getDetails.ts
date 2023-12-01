import { IPlaceDetails, PlaceType } from "@hienpham512/roadtrip";

import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const getDetails: ({
  placeId,
  placeType,
}: {
  placeId: string;
  placeType: PlaceType;
}) => Promise<IPlaceDetails | null> = async ({ placeId, placeType }) => {
  const apiUrl = `${baseUrl}/${placeType}/${placeId}`;
  
  try {
    const result = await axios.get(apiUrl);
    return result.data as IPlaceDetails;
  } catch {
    return null;
  }
};
