
const setupDatabase = require("./src/utils/conecion");
const setupUserModel = require("./src/entities/user");
const setupProfileModel = require("./src/entities/profile");
const {createdUser} = require('./src/useCases/user')

module.exports = async function (config) {
  const sequelize = setupDatabase(config);
  const userModel = setupUserModel(config);
  const profileModel = setupProfileModel(config);

  userModel.hasOne(profileModel);
  profileModel.belongsTo(userModel);

  await sequelize.authenticate();  
  await sequelize.sync({ force: true });

  let userTest = {
          firstName: "Petronas",
          lastName: "Type",
          mail: "example1@gmail.com",
          password: "test1",
  }      

  await createdUser(userModel, userTest);
  await createdUser(userModel, userTest);

};
