const { QueryTypes } = require("sequelize");
const sequelize = require("postgres-db-connect");
const setupSuscriptorModel = require("../entities/suscriptor");
const logger = require("../utils/logger");

async function createdSuscritor(userId, challengeId) {
  try {
    if (
      userId === "" ||
      challengeId === ""
    ) {
      logger.error(
        `[fr-activity-module]: Información invalid, userId: ${userId} or activityId ${challengeId}`
      );
      throw new Error("Invalid Information");
    }
    let suscriptor = await sequelize.query(
      `INSERT INTO suscriptors ("userId","challengeId", "isActive", "createdAt","updatedAt")
        VALUES ('${userId}','${challengeId}', true , now(),now()) RETURNING id,"userId","challengeId", "isActive", "createdAt"`,
      { type: QueryTypes.INSERT }
    );

    return suscriptor[0];
  } catch (error) {
      logger.error(
        `[fr-activity-module]: Error al crear un suscriptor :${error.message}`
      );
    throw new Error(error.message);
  }
}

module.exports = { createdSuscritor };