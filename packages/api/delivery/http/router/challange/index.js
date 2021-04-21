const { challenge,suscriptor } = require("../../../../adapter");

async function challengeRouter(fastify) {
  fastify.post("/activities", challenge.createdActivities);
  fastify.get("/activities/:userId", challenge.getAllActivities);
  fastify.get("/activities/:userId/profile", challenge.getActivitiesByUser);
  fastify.post("/suscribe", suscriptor.createSuscriptors);
}

module.exports = challengeRouter;
