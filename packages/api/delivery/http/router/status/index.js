const { healthyChecks } = require("../../../../adapter");

module.exports = async function health(fastify) {
  fastify.get("/", healthyChecks.liveness);
};
