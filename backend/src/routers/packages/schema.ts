import {
  attractionItem,
  eventItem,
  eventQueryString,
} from "../eventsAttractions/schema";

import { accomodationItem } from "../accomodations/schema";
import { barItem } from "../bars/schema";
import { googleQueryString } from "../schema";
import { nightClubItem } from "../nightClubs/schema";
import { restaurantItem } from "../restaurants/schema";

export const schema = {
  schema: {
    description: "Packages data",
    tags: ["Packages"],
    summary: "POST Packages",
    body: {
      required: ["origin", "destination"],
      type: "object",
      properties: {
        origin: {
          type: "object",
          properties: {
            lat: {
              type: "number",
            },
            lng: {
              type: "number",
            },
          },
        },
        destination: {
          type: "object",
          properties: {
            lat: {
              type: "number",
            },
            lng: {
              type: "number",
            },
          },
        },
      },
    },
    querystring: {
      type: "object",
      properties: {
        ...eventQueryString,
        ...googleQueryString,
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          events: {
            type: "array",
            item: {
              ...eventItem,
            },
          },
          accomodations: {
            type: "array",
            item: {
              ...accomodationItem,
            },
          },
          attractions: {
            type: "array",
            item: {
              type: "object",
              ...attractionItem,
            },
          },
          restaurants: {
            type: "array",
            item: {
              type: "object",
              ...restaurantItem,
            },
          },
          bars: {
            type: "array",
            item: {
              type: "object",
              ...barItem,
            },
          },
          nightClubs: {
            type: "array",
            item: {
              type: "object",
              ...nightClubItem,
            },
          },
        },
        400: {
          type: "object",
          properties: {
            statusCode: {
              type: "number",
            },
            error: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
          description: "Bad Request",
        },
        500: {
          type: "object",
          properties: {
            statusCode: {
              type: "number",
            },
            error: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
          description: "Service Unavailable",
        },
      },
    },
  },
};
