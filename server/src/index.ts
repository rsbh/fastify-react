import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";

const server = fastify();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const HOST = process.env.HOST || "0.0.0.0";

server.register(fastifyStatic, {
  root: path.join(__dirname, "..", "public"),
});

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

function shutDown(signal: string) {
  console.log(`Received ${signal}`);
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    process.exit(0);
  });
}

process.on("SIGTERM", () => {
  shutDown("SIGTERM");
});

process.on("SIGINT", () => {
  shutDown("SIGINT");
});
