const { challenge,suscriptor } = require("../../../../adapter");

async function challengeRouter(fastify) {
  fastify.post("/activities", challenge.createdActivities);
  fastify.get("/activities/:userId", challenge.getAllActivities);
  fastify.get("/activities/:userId/profile", challenge.getActivitiesByUser);
  fastify.put("/activities", challenge.changeActivities);
  fastify.post("/suscribe", suscriptor.createSuscriptors);
  fastify.post("/eliminarActividadUser", suscriptor.deleteSuscrip);
}

module.exports = challengeRouter;
