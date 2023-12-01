import config from "../../config";
import fastifyMongo from "@fastify/mongodb";
import fastifyPlugin from "fastify-plugin";

const dbConnector = async (fastify: any, options: any) => {
  const mongoUri = config.database.mongoUri;
  const url = mongoUri
    .replace("<user_name>", config.database.mongoDbUserName)
    .replace("<password>", config.database.mongoDbPassword);
  try {
    await fastify.register(fastifyMongo, { url });
  } catch (error) {
    console.log(error);
  }
};

export default fastifyPlugin(dbConnector);
