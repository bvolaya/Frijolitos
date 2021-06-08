const { challenge,suscriptor } = require("../../../../adapter");
const  {store} = require('../../../../config/multer')

async function challengeRouter(fastify) {
  let upload = process.env.NODE_ENV === 'prod' ? store() : store('tmp/user')
  fastify.post("/activities",{ preHandler: upload.fields([
      { name: 'image', maxCount: 1 }
    ]) }, challenge.createdActivities);
  fastify.get("/activities/:userId", challenge.getAllActivities);
  fastify.get("/activities/:userId/profile", challenge.getActivitiesByUser);
  fastify.put("/activities",{ preHandler: upload.fields([
      { name: 'image', maxCount: 1 }
    ]) }, challenge.changeActivities);
  fastify.post("/suscribe", suscriptor.createSuscriptors);
  fastify.put("/eliminarActividadUser", suscriptor.deleteSuscrip);
  fastify.get("/obtenerActividad/:activityId", challenge.getActivityById);
  fastify.get("/activitiesPsycology/:userId", challenge.getAllActivitiesPsycology);
  fastify.get("/activityDetails/:activityId", challenge.activityDetails);
}

module.exports = challengeRouter;
