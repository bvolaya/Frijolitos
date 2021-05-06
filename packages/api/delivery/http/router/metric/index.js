const { metric } = require("../../../../adapter");

async function metricRouter(fastify) {
    fastify.get("/metric/:userId", metric.getBasicMetrics);
}

module.exports = metricRouter;
