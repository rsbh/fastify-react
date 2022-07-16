import fastify from "fastify";

const server = fastify();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const HOST = process.env.HOST || "0.0.0.0";

server.get("/api/ping", async (request, reply) => {
  return {
    message: "pong",
  };
});

server.listen({ port: PORT, host: HOST }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
