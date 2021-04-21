const {createSuscritor} = require('@frijol/activity-model')

async function createSuscriptors(req, reply) {
  const data = req.body;

  req.log.info(
    `Creating suscritor id: ${data.userId} to: ActivityId ${data.activityId}`
  );

  try {
    const activity = await createSuscritor(data.userId, data.activityId);
    reply
      .code(201)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: activity });
  } catch (error) {
    req.log.error(
      `Error to create id: ${data.userId} to: ActivityId ${data.activityId} because ${error.message}`
    );
    reply
      .code(500)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: "Error Interno " + error.message });
  }
}

async function deleteSuscriptor(req, reply) {
  const data = req.body;

  req.log.info(
    `Deleting SuscriptorId ${data.suscriptorId}`
  );

  try {
    await deleteSuscriptor(data.suscriptorId);
    reply
      .code(200)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: '¡Te has salido de la actividad!' });
  } catch (error) {
    req.log.error(
      `Error to delete SuscriptorId ${data.suscriptorId} because ${error.message}`
    );
    reply
      .code(500)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: "Error Interno " + error.message });
  }
}

module.exports = { createSuscriptors, deleteSuscriptor }