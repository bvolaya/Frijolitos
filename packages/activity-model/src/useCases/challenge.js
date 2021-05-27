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
          `INSERT INTO challenges (title,direction, description, "image" ,date, categorie,"createdAt","updatedAt","userId")
        VALUES ('${title}','${direction}', '${description}', '${image}', '${date}', '${categorie}', now(),now(), ${userId}) RETURNING id,title,direction, description, date, categorie;`,
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

async function getActivitiesPsycology(id) {
  try {
      let activities = await sequelize.query(`
      SELECT * FROM challenges WHERE "userId"=${id} AND "isActive"=true;`
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

async function getActivityDetails(id) {
    try {
      let activity = await getActivity(id);
      let participants = [];
      let recomended = [];
      if (activity.length) {
        participants = await sequelize.query(`
                              SELECT U.*, PP."nickName", PP.img FROM users AS U LEFT JOIN "profileParticipants" AS PP ON U.id=PP."userId" LEFT JOIN suscriptors AS S ON U.id=S."userId" WHERE S."challengeId"=${activity[0].id};`,
                              { type: QueryTypes.SELECT }
                            );
        recomendedCategorie = await sequelize.query(`
                              SELECT * FROM challenges AS CH WHERE id!=${activity[0].id} AND categorie IN ('${activity[0].categorie}') AND "isActive"=true ORDER BY title LIMIT 10;`,
                              { type: QueryTypes.SELECT }
                            );
        if (recomendedCategorie.length<10) {
          let limit = 10-recomendedCategorie.length;
          recomendedOtherCategories = await sequelize.query(`
                                SELECT * FROM challenges AS CH WHERE categorie NOT IN ('${activity[0].categorie}') AND "isActive"=true ORDER BY categorie, title LIMIT ${limit};`,
                                { type: QueryTypes.SELECT }
                              );
          recomended = recomendedCategorie.concat(recomendedOtherCategories);
        }
      }
      return { activity, participants, recomended };
    } catch (error) {
      throw new Error(error.message);
    }
  
  }

module.exports = { createdActivity, getAllActivity, getActivityByUser,modifyActivity, getActivity, getActivitiesPsycology, getActivityDetails};