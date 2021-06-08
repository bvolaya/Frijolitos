const {createSuscritor,deleteSuscriptor} = require('@frijol/activity-model')

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

async function deleteSuscrip(req, reply) {
  const data = req.body;

  req.log.info(
    `Delete suscript with challengeId=${data.challengeId} and userId=${data.userId}`
  );

  try {
    const deleteSusc = await deleteSuscriptor(data);
    reply
      .code(201)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({
        status: 201,
        data: deleteSusc
      });
  } catch (error) {
    console.log(error);
    reply
      .code(500)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({
        status: 500,
        data: "Error Interno " + error.message
      });
  }
}

module.exports = { createSuscriptors, deleteSuscrip }