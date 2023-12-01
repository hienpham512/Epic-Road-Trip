import { googleQueryString } from "../schema";

export const accomodationItem = {
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

export const schema = {
  schema: {
    description: "Accomodations data",
    tags: ["Accomodations"],
    summary: "POST Accomodations",
    body: {
      type: "object",
      required: ["location"],
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
              ...accomodationItem,
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

export const accomodationNextPageSchema = {
  schema: {
    description: "Accomodations data",
    tags: ["Accomodations"],
    summary: "POST Accomodations",
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
              ...accomodationItem,
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

export const accomodationDetailSchema = {
  schema: {
    description: "Accomodation details data",
    tags: ["Accomodation details"],
    summary: "GET Accomodation details",
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
              ...accomodationItem.properties,
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
