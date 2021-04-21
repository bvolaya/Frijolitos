const {
  createdActivity,
  getAllActivity,
  getActivityByUser
} = require("@frijol/activity-model/src/useCases/challenge");


async function createdActivities(req, reply) {
    const data = req.body;
  req.log.info(`Creating activity ${data.title}`);

  try {
    const activity = await createdActivity(data);
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

module.exports = { createdActivities, getAllActivities, getActivitiesByUser };