const setupDatabase = require("./src/utils/conecion");
const setupUserModel = require("./src/entities/user");
const setupProfileModel = require("./src/entities/profile");
module.exports = async function (config) {
  const sequelize = setupDatabase(config);
  const userModel = setupUserModel(config);
  const profileModel = setupProfileModel(config);

  userModel.hasOne(profileModel);
  profileModel.belongsTo(userModel);
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
};
