
const setupUserModel = require("../entities/user");

async function createdUser(UserData) {


  try {
    const userInstance = await setupUserModel().create({
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
    const userInstance = await setupUserModel().findAll({
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
        "role",
        "profile"
      ],
    });


    if (userInstance.length == 0) {
      throw new Error("The User don't exist");
    } else if (userInstance[0].password == UserData.password) {
      var profile = {}
      if (UserData.role == "psychology") {
        profile = {
          nickName: userInstance[0].nickName,
          description: userInstance[0].description,
          img: userInstance[0].img
        }
      } else if (UserData.role == "participant") {
        profile = {
          cc: userInstance[0].cc,
          urlcc: userInstance[0].urlcc,
          profesionalcard: userInstance[0].profesionalcard,
          urlcard: userInstance[0].urlcard,
          img: userInstance[0].img,
          direction: userInstance[0].direction,
          phone: userInstance[0].phone,
          yeargraduation: userInstance[0].yeargraduation
        }
      }
      return {
        "id": userInstance[0].id,
        "firstName": userInstance[0].firstName,
        "lastName": userInstance[0].lastName,
        "mail": userInstance[0].mail,
        "isVerify": userInstance[0].isVerify,
        "role": userInstance[0].role,
        "profile": profile
      }
    } else {
      throw new Error("Password Invalid");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = { createdUser, login };