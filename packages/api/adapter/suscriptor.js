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

module.exports= {createSuscriptors}