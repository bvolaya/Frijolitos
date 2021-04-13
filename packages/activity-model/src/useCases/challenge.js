
const setupActivityModel = require("../entities/challenge");
const setupUserModel = require("@frijol/user-model/src/entities/user");
const { QueryTypes } = require("sequelize");
const sequelize = require("postgres-db-connect");

async function createdActivity(ActivityData) {
    const {
      title,
      description,
      direction,
      date,
      image,
      categorie,
      userId,
    } = ActivityData;
    try {
        if (
          title === "" ||
          description === "" ||
          direction === "" ||
          date === "" ||
          userId === ""
        ) {
            throw new Error("Invalid Information")
        }
/*         let user = await setupUserModel().findOne({
          where: {
            id: userId,
          },
        });
        let activity = await setupActivityModel().create(
          {
            title,
            description,
            direction,
            date,
            image,
            categorie,
            user: userId,
          }
        ); */

        let activity = await sequelize.query(
          `INSERT INTO challenges (title,direction, description, date, categorie,"createdAt","updatedAt","userId")
        VALUES ('${title}','${direction}', '${description}', '${date}', '${categorie}', now(),now(), ${userId}) RETURNING id,title,direction, description, date, categorie;`,
          { type: QueryTypes.INSERT }
        );

        return activity[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllActivity() {
    try {
        const activities = await setupActivityModel().findAll();
        return activities;
    } catch (error) {
        throw new Error(error.message);
    }    

}

async function getActivityByUser(id) {
  try {
    if (!id) throw new Error("The Id is Require")   
    const activities = await sequelize.query(
      `SELECT * FROM challenges WHERE "userId" = ${id}`
    );
    return activities[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createdActivity, getAllActivity, getActivityByUser };