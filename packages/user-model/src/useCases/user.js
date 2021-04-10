
const env = require('../../config/enviroment')
const  setupUserModel = require("../entities/user");
<<<<<<< HEAD
=======
const { QueryTypes } = require("sequelize");
const setupDatabase = require("../utils/conecion");
const sequelize = setupDatabase(env);
>>>>>>> 1fff1920f0e0268a95a45800add6585cd4ff791c

async function createdUser(UserData) {
  

    try {
        const userInstance = await setupUserModel(env).create({
          firstName: UserData.firstName,
          lastName: UserData.lastName,
          mail: UserData.mail,
          password: UserData.password,
        });

        return userInstance;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function login(UserData) {
  try {
    const userInstance = await setupUserModel(env).findAll({
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
      };
    } else {
      throw new Error("Password Invalid");
    }

  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = { createdUser, login };