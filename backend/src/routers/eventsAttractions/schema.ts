import { googleQueryString } from "../schema";

export const eventItem = {
  properties: {
    name: {
      type: "string",
    },
    type: {
      type: "string",
    },
    id: {
      type: "string",
    },
    test: {
      type: "boolean",
    },
    description: {
      type: "string",
    },
    url: {
      type: "string",
    },
    locale: {
      type: "string",
    },
    images: {
      type: "array",
      properties: {
        ratio: {
          type: "string",
        },
        url: {
          type: "string",
        },
        width: {
          type: "number",
        },
        height: {
          type: "number",
        },
        fallback: {
          type: "boolean",
        },
      },
    },
    sales: {
      type: "object",
      properties: {
        public: {
          type: "object",
        },
        presales: {
          type: "object",
        },
      },
    },
    dates: {
      type: "object",
      properties: {
        start: {
          type: "object",
          properties: {
            localDate: {
              type: "string",
            },
            localTime: {
              type: "string",
            },
            dateTime: {
              type: "string",
            },
            dateTBD: {
              type: "boolean",
            },
            dateTBA: {
              type: "boolean",
            },
            timeTBA: {
              type: "boolean",
            },
            noSpecificTime: {
              type: "boolean",
            },
          },
        },
      },
    },
    classifications: {
      type: "array",
      items: {
        type: "object",
        properties: {
          primary: {
            type: "boolean",
          },
          segment: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
            },
          },
          genre: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
            },
          },
          subGenre: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
            },
          },
        },
      },
    },
    promoters: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
      },
    },
    info: {
      type: "string",
    },
    priceRanges: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: {
            type: "string",
          },
          currency: {
            type: "string",
          },
          min: {
            type: "number",
          },

          max: {
            type: "number",
          },
        },
      },
    },
    pleaseNote: {
      type: "string",
    },
    accessibility: {
      type: "object",
      properties: {
        ticketLimit: {
          type: "number",
        },
      },
    },
    ticketLimit: {
      type: "object",
      properties: {
        info: {
          type: "string",
        },
      },
    },

    _links: {
      type: "object",
      properties: {
        self: {
          type: "object",
          properties: {
            href: {
              type: "string",
            },
          },
        },
        attractions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              href: {
                type: "string",
              },
            },
          },
        },
        venues: {
          type: "array",
          items: {
            type: "object",

            properties: {
              href: {
                type: "string",
              },
            },
          },
        },
      },
    },
    _embedded: {
      type: "object",
      properties: {
        venues: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
              id: {
                type: "string",
              },
              test: {
                type: "boolean",
              },
              url: {
                type: "string",
              },
              locale: {
                type: "string",
              },
              postalCode: {
                type: "string",
              },
              timezone: {
                type: "string",
              },
              city: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                },
              },
              state: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  stateCode: {
                    type: "string",
                  },
                },
              },
              country: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  countryCode: {
                    type: "string",
                  },
                },
              },
              address: {
                type: "object",
                properties: {
                  line1: {
                    type: "string",
                  },
                  line2: {
                    type: "string",
                  },
                  line3: {
                    type: "string",
                  },
                },
              },
              location: {
                type: "object",
                properties: {
                  longitude: {
                    type: "string",
                  },
                  latitude: {
                    type: "string",
                  },
                },
              },
              upComingEvents: {
                type: "object",
                properties: {
                  _total: {
                    type: "number",
                  },
                  _filtered: {
                    type: "number",
                  },
                },
              },
              _links: {
                type: "object",
                properties: {
                  self: {
                    type: "object",
                    properties: {
                      href: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        attractions: {
          type: "array",
          items: {
            type: "object",
          },
        },
      },
    },
  },
};

export const attractionItem = {
  properties: {
    business_status: {
      type: "string",
    },
    geometry: {
      type: "object",
      properties: {
        location: {
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
        viewport: {
          type: "object",
          properties: {
            northeast: {
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
            southwest: {
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
      },
    },
    icon: {
      type: "string",
    },
    icon_background_color: {
      type: "string",
    },
    icon_mask_base_uri: {
      type: "string",
    },
    name: {
      type: "string",
    },
    opening_hours: {
      type: "object",
      properties: {
        open_now: {
          type: "boolean",
        },
        periods: {
          type: "array",
          items: {
            type: "object",
            properties: {
              close: {
                type: "object",
                properties: {
                  day: {
                    type: "number",
                  },
                  time: {
                    type: "string",
                  },
                },
              },
              open: {
                type: "object",
                properties: {
                  day: {
                    type: "number",
                  },
                  time: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        weekday_text: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
    photos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          height: {
            type: "number",
          },
          html_attributions: {
            type: "array",
            items: {
              type: "string",
            },
          },
          photo_reference: {
            type: "string",
          },
          width: {
            type: "number",
          },
        },
      },
    },
    place_id: {
      type: "string",
    },
    plus_code: {
      type: "object",
      properties: {
        compound_code: {
          type: "string",
        },
        global_code: {
          type: "string",
        },
      },
    },
    price_level: {
      type: "number",
    },
    rating: {
      type: "number",
    },
    reference: {
      type: "string",
    },
    scope: {
      type: "string",
    },
    types: {
      type: "array",
      items: {
        type: "string",
      },
    },
    user_ratings_total: {
      type: "number",
    },
    vicinity: {
      type: "string",
    },
  },
};

export const eventQueryString = {
  radius: {
    type: "string",
    description: "Radius",
  },
  startDateTime: {
    type: "string",
    description: "Start date time",
  },
  endDateTime: {
    type: "string",
    description: "End date time",
  },
  onsaleStartDateTime: {
    type: "string",
    description: "On sale start date time",
  },
  onsaleEndDateTime: {
    type: "string",
    description: "On sale end date time",
  },

  page: { type: "number", description: "Page number" },
  size: { type: "number", description: "Size of page" },
};

export const schemaEvent = {
  schema: {
    description: "Events data",
    tags: ["Events"],
    summary: "Post events",
    body: {
      required: ["location"],
      type: "object",
      properties: {
        sort: {
          type: "object",
          properties: {
            prop: {
              type: "string",
              description: "Sort property",
            },
            order: {
              type: "string",
              description: "Sort order",
            },
          },
        },
        location: {
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
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          events: {
            type: "array",
            items: {
              type: "object",
              ...eventItem,
            },
          },
          page: {
            type: "object",
            properties: {
              size: {
                type: "number",
              },
              totalElements: {
                type: "number",
              },
              totalPages: {
                type: "number",
              },
              number: {
                type: "number",
              },
            },
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
};

export const eventNextPageSchema = {
  schema: {
    description: "Events data",
    tags: ["Events"],
    summary: "Post events",
    body: {
      required: ["location"],
      type: "object",
      properties: {
        location: {
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
      required: ["page"],
      properties: {
        ...eventQueryString,
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          events: {
            type: "array",
            items: {
              type: "object",
              ...eventItem,
            },
          },
          page: {
            type: "object",
            properties: {
              size: {
                type: "number",
              },
              totalElements: {
                type: "number",
              },
              totalPages: {
                type: "number",
              },
              number: {
                type: "number",
              },
            },
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
};

export const schemaAttraction = {
  schema: {
    description: "Attractions data",
    tags: ["Attractions"],
    summary: "POST Attractions",
    body: {
      required: ["location"],
      type: "object",
      properties: {
        location: {
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
        ...googleQueryString,
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          html_attributions: {
            type: "array",
            items: {
              type: "string",
            },
          },
          next_page_token: {
            type: "string",
          },

          results: {
            type: "array",
            items: {
              type: "object",
              ...attractionItem,
            },
          },
          status: {
            type: "string",
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
};

export const attractionNextPageSchema = {
  schema: {
    description: "Attractions data",
    tags: ["Attractions"],
    summary: "POST Attractions",
    querystring: {
      type: "object",
      required: ["pagetoken"],
      properties: {
        pagetoken: {
          type: "string",
        },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          html_attributions: {
            type: "array",
            items: {
              type: "string",
            },
          },
          next_page_token: {
            type: "string",
          },

          results: {
            type: "array",
            items: {
              type: "object",
              ...attractionItem,
            },
          },
          status: {
            type: "string",
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
};

export const eventDetailsSchema = {
  schema: {
    description: "Event details data",
    tags: ["Events details"],
    summary: "GET Event details",
    response: {
      200: {
        type: "object",
        properties: {
          ...eventItem.properties,
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
      404: {
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
        description: "Not Found",
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
};

export const attractionDetailsSchema = {
  schema: {
    description: "Attraction details data",
    tags: ["Attraction details"],
    summary: "GET Attraction details",
    response: {
      200: {
        type: "object",
        properties: {
          html_attributions: {
            type: "array",
            items: {
              type: "string",
            },
          },
          result: {
            type: "object",
            properties: {
              ...attractionItem.properties,
              formatted_address: {
                type: "string",
              },
              formatted_phone_number: {
                type: "string",
              },
              international_phone_number: {
                type: "string",
              },
              reviews: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    author_name: {
                      type: "string",
                    },
                    author_url: {
                      type: "string",
                    },
                    language: {
                      type: "string",
                    },
                    profile_photo_url: {
                      type: "string",
                    },
                    rating: {
                      type: "number",
                    },
                    relative_time_description: {
                      type: "string",
                    },
                    text: {
                      type: "string",
                    },
                    time: {
                      type: "number",
                    },
                  },
                },
              },

              url: {
                type: "string",
              },
              utc_offset: {
                type: "number",
              },
              website: {
                type: "string",
              },
            },
          },
          status: {
            type: "string",
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
      404: {
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
        description: "Not Found",
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
};
