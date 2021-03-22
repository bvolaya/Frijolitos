
const setupDatabase = require("./src/utils/conecion");
const setupUserModel = require("../user-model/src/entities/user");
const setupProfileModel = require("../user-model/src/entities/profile");
const setupActivitiesModel = require("./src/entities/challenge");

module.exports = async function (config) {
  // Sync Model to User
  const sequelize = setupDatabase(config);
  const userModel = setupUserModel(config);
  const profileModel = setupProfileModel(config);

  userModel.hasOne(profileModel);
  profileModel.belongsTo(userModel);

  // Sync Model to Activities
  const activitiesModel = setupActivitiesModel(config);  
  userModel.hasMany(activitiesModel);
  activitiesModel.belongsTo(userModel);

  await sequelize.authenticate();  
  await sequelize.sync({ force: true });

};
