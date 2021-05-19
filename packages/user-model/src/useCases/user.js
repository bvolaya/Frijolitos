
const  {
  setupUserModel,
  setupProfilePsycologyModel,
  setupProfileParticipantModel} = require("../entities");

const sequelize = require("postgres-db-connect");

async function createdUser(UserData) {
    const t = await sequelize.transaction();
    try {
        const userModel = setupUserModel();
        const profilePsycology = setupProfilePsycologyModel();
        const profileParticipant = setupProfileParticipantModel();
        let instance = {}
        const user = await userModel.create({
            firstName: UserData.firstName,
            lastName: UserData.lastName,
            mail: UserData.mail,
            password: UserData.password,
            rol: UserData.rol
        }, { transaction: t })

        if(UserData.rol === 'psychology'){

            const profile = await profilePsycology.create({
                userId: user.id,
                cc:parseInt(UserData.cc),
                urlcc:UserData.files.imgCC[0].destination+"/"+UserData.files.imgCC[0].filename,
                profesionalcard:parseInt(UserData.profesionalcard),
                urlcard:UserData.files.imgCard[0].destination+"/"+UserData.files.imgCard[0].filename,
                img:UserData.files.imgProfile[0].destination +"/"+UserData.files.imgProfile[0].filename,
                direction:UserData.direction,
                phone:UserData.phone,
                yeargraduation:parseInt(UserData.yeargraduation)
            }, { transaction: t })

            await t.commit();
            Object.assign(instance,user.dataValues)
            instance['profile'] = profile.dataValues

            return instance;
        }else if(UserData.rol === 'participant'){
            const profile = await profileParticipant.create({
                userId: user.id,
                nickName:UserData.nickName,
                description:UserData.description,
                img:UserData.files.imgProfile[0].destination +"/"+UserData.files.imgProfile[0].filename
            }, { transaction: t })

            await t.commit();
            Object.assign(instance,user.dataValues)
            instance['profile'] = profile.dataValues

            return instance;
        }else if (UserData.rol === 'business'){

        }else {
            throw new Error("Invalid Rol")
        }
    }catch (error) {
        await t.rollback();
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