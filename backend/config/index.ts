import dotenv from "dotenv";

dotenv.config();
const config = {
  database: {
    mongoUri:
      process.env.MONGO_DB_URI ||
      "mongodb+srv://<user_name>:<password>@epitechproject.sxd9agj.mongodb.net/?retryWrites=true&w=majority",
    mongoDbName: process.env.MONGO_DB_NAME || "road_trip",
    mongoDbUserName: process.env.MONGO_DB_USER_NAME || "",
    mongoDbPassword: process.env.MONGO_DB_PASSWORD || "",
  },
  services: {
    events: {
      url:
        process.env.TICKETMASTER_API_URL ||
        "https://app.ticketmaster.com/discovery/v2/events",
      apiKey: process.env.TICKETMASTER_API_KEY,
    },
    googleApi: {
      url:
        process.env.GOOGLE_API_URL ||
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      apiKey: process.env.GOOGLE_API_KEY,
    },
    googleApiDirections: {
      url:
        process.env.GOOGLE_API_DIRECTIONS_URL ||
        "https://maps.googleapis.com/maps/api/directions/json",
      apiKey: process.env.GOOGLE_API_KEY,
    },
    googleApiPlaceDetails: {
      url: process.env.GOOGLE_API_PLACE_DETAILS_URL ||
      "https://maps.googleapis.com/maps/api/place/details/json",
      apiKey: process.env.GOOGLE_API_KEY,
    }
  },
  server: {
    port: Number(process.env.PORT) || 8080,
    IP: process.env.IP || `localhost`,
  },
  options: {
    radius: Number(process.env.RADIUS) || 50000,
  },
};

export default config;
