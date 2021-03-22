
const setupDatabase = require("./src/utils/conecion");
const setupUserModel = require("@frijol/user-model");
const setupActivitiesModel = require("./src/entities/challenge");

module.exports = async function (config) {
  // Sync Model to Activities
  const activitiesModel = setupActivitiesModel(config);  
  userModel.hasMany(activitiesModel);
  activitiesModel.belongsTo(userModel);

  await sequelize.authenticate();  
  await sequelize.sync({ force: true });

};
