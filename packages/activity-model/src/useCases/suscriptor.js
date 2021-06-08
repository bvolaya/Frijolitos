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

async function deleteSuscriptor(data) {
  try {
    if (!data) {
      throw new Error("Invalid Input, We need the information about the activity and user")
    }

    let deleteResult = await sequelize.query(
      `UPDATE suscriptors SET "isActive"=false, state='Cancelado', "updatedAt"=now() WHERE "challengeId"=${data.challengeId} AND "userId"=${data.userId};`,
      { type: QueryTypes.UPDATE }
    );
    return deleteResult[0][0]
  } catch (error) {
    logger.error(
      `[fr-activity-module]: Error al eliminar un suscriptor :${error.message}`
    );
    throw new Error(error.message);
  }
}

module.exports = { createdSuscritor, deleteSuscriptor };