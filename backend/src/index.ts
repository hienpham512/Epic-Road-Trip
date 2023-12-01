import {
  accomodationsPlugin,
  barsPlugin,
  directionsPlugin,
  eventsPlugin,
  nightClubsPlugin,
  packagesPlugin,
  restaurantsPlugin
} from "./routers";

import Fastify from "fastify";
import config from "../config";
import cors from "@fastify/cors";
import dbConnector from "./mongoDb/dbConnector";
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

const server = Fastify();

// @ts-ignore
server.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: '',
      description: '',
      version: '0.0.1'
    }
  }
})

// @ts-ignore
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Api fastify',
      description: 'Swagger for fastify api',
      version: '0.1.0'
    }
  }
})

server.register(cors, {
  origin: true,
});

server.get("/ping", async (request, reply) => {
  return "pong\n";
});
server.register(dbConnector);
server.register(accomodationsPlugin);
server.register(barsPlugin);
server.register(directionsPlugin);
server.register(eventsPlugin);
server.register(nightClubsPlugin);
server.register(restaurantsPlugin);
server.register(packagesPlugin);

console.log(config.server.port);
// server.listen({ port: config.server.port }, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Server listening at ${address}`);
// });

server.listen({
  port: config.server.port,
  host: config.server.IP
  }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
