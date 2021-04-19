const Fastify = require("fastify");

async function start() {
  const fastify = Fastify({ logger: true });
    fastify.register(require("fastify-cors"), {});
    fastify.register(require("./router/status"));
    fastify.register(require("./router/user"));
    fastify.register(require("./router/challange"));
    fastify.register(require("./router/search"));

  try {
    await fastify.listen(process.env.SERVER_PORT || 3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

module.exports = start;
