const {
  createActivity,
  getAllActivity,
  getActivityByUser,
  changeActivity,
  getActivitiesPsycology,
  getActivity,
  getActivityDetails
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

async function getAllActivitiesPsycology(req, reply) {

  const { userId } = req.params;
  req.log.info(`Search activities psycology ......`);

  try {
    const activities = await getActivitiesPsycology(userId);
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

async function getActivity(req, reply) {

  const { activityId } = req.params;
  req.log.info(`Search activity ......`);

  try {
    const activity = await getActivity(activityId);
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

async function getActivityById(req, reply) {

  const { activityId } = req.params;
  req.log.info(`Search activity ...... by ID ${parseInt(activityId)}`);
  try {
    const activity = await getActivity(parseInt(activityId));
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

async function activityDetails(req, reply) {

  const { activityId } = req.params;
  req.log.info(`Search activity details ...... by ID ${parseInt(activityId)}`);
  try {
    const activity = await getActivityDetails(parseInt(activityId));
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

module.exports = { createdActivities, getAllActivities, getActivitiesByUser,changeActivities, getActivity, getAllActivitiesPsycology, activityDetails, getActivityById}