export const schema = {
  schema: {
    description: "Directions data",
    tags: ["Directions"],
    summary: "POST Directions",
    body: {
      type: "object",
      required: ["origin", "destination"],
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

    response: {
      200: {
        type: "object",
        properties: {
          geocoded_waypoints: {
            type: "array",
            items: {
              type: "object",
              properties: {
                geocoder_status: {
                  type: "string",
                },
                place_id: {
                  type: "string",
                },
                types: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },
          },
          routes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                bounds: {
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
                fare: {
                  type: "object",
                  properties: {
                    currency: {
                      type: "string",
                    },
                    text: {
                      type: "string",
                    },
                    value: {
                      type: "number",
                    },
                  },
                },
                legs: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      arrival_time: {
                        type: "object",
                        properties: {
                          text: {
                            type: "string",
                          },
                          time_zone: {
                            type: "string",
                          },
                          value: {
                            type: "number",
                          },
                        },
                      },
                      departure_time: {
                        type: "object",
                        properties: {
                          text: {
                            type: "string",
                          },
                          time_zone: {
                            type: "string",
                          },
                          value: {
                            type: "number",
                          },
                        },
                      },
                      distance: {
                        type: "object",
                        properties: {
                          text: {
                            type: "string",
                          },
                          value: {
                            type: "number",
                          },
                        },
                      },
                      duration: {
                        type: "object",
                        properties: {
                          text: {
                            type: "string",
                          },
                          value: {
                            type: "number",
                          },
                        },
                      },
                      end_address: {
                        type: "string",
                      },
                      end_location: {
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
                      start_address: {
                        type: "string",
                      },
                      start_location: {
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
                      steps: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            distance: {
                              type: "object",
                              properties: {
                                text: {
                                  type: "string",
                                },
                                value: {
                                  type: "number",
                                },
                              },
                            },
                            duration: {
                              type: "object",
                              properties: {
                                text: {
                                  type: "string",
                                },
                                value: {
                                  type: "number",
                                },
                              },
                            },
                            end_location: {
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
                            html_instructions: {
                              type: "string",
                            },
                            maneuver: {
                              type: "string",
                            },
                            polyline: {
                              type: "object",
                              properties: {
                                points: {
                                  type: "string",
                                },
                              },
                            },
                            start_location: {
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
                            travel_mode: {
                              type: "string",
                            },
                          },
                        },
                      },
                      traffic_speed_entry: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            distance: {
                              type: "object",
                              properties: {
                                text: {
                                  type: "string",
                                },
                                value: {
                                  type: "number",
                                },
                              },
                            },
                            duration: {
                              type: "object",
                              properties: {
                                text: {
                                  type: "string",
                                },
                                value: {
                                  type: "number",
                                },
                              },
                            },
                            end_location: {
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
                            html_instructions: {
                              type: "string",
                            },
                            maneuver: {
                              type: "string",
                            },
                            polyline: {
                              type: "object",
                              properties: {
                                points: {
                                  type: "string",
                                },
                              },
                            },
                            start_location: {
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
                            travel_mode: {
                              type: "string",
                            },
                          },
                        },
                      },
                      via_waypoint: {
                        type: "array",
                        items: {
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
                            step_index: {
                              type: "number",
                            },
                            step_interpolation: {
                              type: "number",
                            },
                          },
                        },
                      },
                    },
                  },
                },
                overview_polyline: {
                  type: "object",
                  properties: {
                    points: {
                      type: "string",
                    },
                  },
                },
                summary: {
                  type: "string",
                },
                warnings: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                waypoint_order: {
                  type: "array",
                  items: {
                    type: "number",
                  },
                },
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
