const {
  createActivity,
  getAllActivity,
  getActivityByUser,
  changeActivity
} = require("@frijol/activity-model");


async function createdActivities(req, reply) {
    const data = req.body;
  req.log.info(`Creating activity ${data.title}`);

  try {
    const activity = await createActivity(data);
    reply
      .code(201)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: activity });
  } catch (error) {
    console.log(error);
    reply
      .code(500)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: "Error Interno " + error.message });
  }
  
}
async function changeActivities(req, reply) {
  const data = req.body;
  req.log.info(`Change activity ${data.title}`);
  try {
    const activity = await changeActivity(data);
    reply
        .code(201)
        .headers("Content-Type", "application/json; charset=utf-8")
        .send({
          status:201,
          data: activity
        });
  } catch (error) {
    console.log(error);
    reply
        .code(500)
        .headers("Content-Type", "application/json; charset=utf-8")
        .send({
          status:500,
          data: "Error Interno " + error.message
        });
  }

}

async function getAllActivities(req, reply) {

  const { userId } = req.params;
  req.log.info(`Search activity ......`);

  try {
    const activity = await getAllActivity(userId);
    reply
      .code(200)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: activity });
  } catch (error) {
    console.log(error);
    reply
      .code(500)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: "Error Interno " + error.message });
  }
}

async function getActivitiesByUser(req, reply) {
    const { userId } = req.params;

  req.log.info(`Search activity ...... by ${parseInt(userId)} `);

  try {
    const activities = await getActivityByUser(parseInt(userId));
    reply
      .code(200)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: activities });
  } catch (error) {
    console.log(error);
    reply
      .code(500)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: "Error Interno " + error.message });
  }
}

module.exports = { createdActivities, getAllActivities, getActivitiesByUser,changeActivities };