const { challenge,suscriptor } = require("../../../../adapter");

async function challengeRouter(fastify) {
  fastify.post("/activities", challenge.createdActivities);
  fastify.get("/activities", challenge.getAllActivities);
  fastify.get("/activities/:userId", challenge.getActivitiesByUser);  
  fastify.post("/suscribe", suscriptor.createSuscriptors);
  fastify.post("/eliminarActividadUser", suscriptor.deleteSuscriptor);
}

module.exports = challengeRouter;
