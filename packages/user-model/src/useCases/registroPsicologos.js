const  setupUserModel = require("../entities/registroPsicologos");
const multer = require('multer');
async function createdUserPsicologos(UserData) {
  

    try {
        const userInstance = await setupUserModelPsiologos().create({
          firstName: UserData.firstName,
          lastName: UserData.lastName,
          mail: UserData.mail,
          password: UserData.password,
          date: UserData.date,
          addres: UserData.addres,
          document : UserData.document
        });
        let activity = await sequelize.query(
          `INSERT INTO challenges (firstName, lastName, mail, password, date, addres, document, "createdAt","updatedAt","userId")
        VALUES ('${firstName}','${lastName}', '${mail}', '${password}', '${date}', '${addres}', '${document.name}', now(),now(), ${userId}) RETURNING id, firstName, lastName, mail, password, date, addres, document;`,
          { type: QueryTypes.INSERT }
        );
        return userInstance;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function login(UserData) {
  try {
    const userInstance = await setupUserModelPsiologos().findAll({
      where: {
        mail: UserData.mail,
      },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "mail",
        "isVerify",
        "password",
        "date",
        "document",
        "addres"
      ],
    });


    if (userInstance.length == 0) {
      throw new Error("The User don't exist");
    } else if (userInstance[0].password == UserData.password) {
      return {
        id:userInstance[0].id,
        firstName: userInstance[0].firstName,
        lastName: userInstance[0].lastName,
        mail: userInstance[0].mail,
        isVerify: userInstance[0].isVerify,
        date: userInstance[0].date,
        addres: userInstance[0].addres,
        document : userInstance[0].document.name
      };
    } else {
      throw new Error("Password Invalid");
    }

  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = { createdUserPsicologos, login };