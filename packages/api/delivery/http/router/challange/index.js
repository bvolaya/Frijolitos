const { challenge } = require("../../../../adapter");

async function challengeRouter(fastify) {
  fastify.post("/activities", challenge.createdActivities);
  fastify.get("/activities", challenge.getAllActivities);
  fastify.get("/activities/:userId", challenge.getActivitiesByUser);
}

module.exports = challengeRouter;
