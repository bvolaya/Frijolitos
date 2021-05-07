

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

async function getAllActivity(id) {
    try {
        let activities = await sequelize.query(`
        select * from challenges
        where challenges."isActive" and 
           challenges.id not in(select "challengeId" from suscriptors where suscriptors."isActive" and suscriptors."userId" = ${id});`
            , { type: QueryTypes.SELECT }
        )
        return activities;
    } catch (error) {
        throw new Error(error.message);
    }    

}

async function getActivity(id) {
  try {
      let activities = await sequelize.query(`
      select * from challenges where challenges.id = ${id};`
          , { type: QueryTypes.SELECT }
      )
      return activities;
  } catch (error) {
      throw new Error(error.message);
  }    

}

async function getActivityByUser(id) {
  try {
    if (!id) throw new Error("The Id is Require")   
    const activities = await sequelize.query(
      `SELECT challenges.id,title,description,direction,date,image,categorie, s."isActive" as status FROM challenges
        inner join suscriptors s on challenges.id = s."challengeId"
        where s."userId" = ${id} and s."isActive" = true;`,
        { type: QueryTypes.SELECT }
    );
    return activities;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function modifyActivity(changeActivity){
    try{
        if (!changeActivity) {
            throw new Error("Invalid Input, We need the information about the activity")
        }
        let fields = ''
        for (let field in changeActivity){
            if (field !== "id" && field !== "userId" && field !== "isActive"){
                fields += `${field}='${changeActivity[field]}',`
            }
            if (field === "isActive") {
                fields += `"${field}"=${changeActivity[field]},`
            }
        }
        fields = fields.substring(0, fields.length - 1)

        let query = `UPDATE challenges set ${fields} WHERE challenges.id = ${changeActivity.id} RETURNING id,title,direction, description, date, image, categorie;`
        let result =  await sequelize.query(query, {type: QueryTypes.UPDATE})
        return result[0][0]
    }catch (e) {
        console.log(e.message)
    }
}


module.exports = { createdActivity, getAllActivity, getActivityByUser,modifyActivity, getActivity};