
const setupDatabase = require("./src/utils/conecion");
const setupUserModel = require("@frijol/user-model/src/entities/user");
const setupActivitiesModel = require("./src/entities/challenge");
const setupSuscriptorModel = require("./src/entities/suscriptor");

module.exports = async function (config) {
  // Sync Model to Activities
  const sequelize = setupDatabase(config);
  const userModel = setupUserModel(config);
  const activitiesModel = setupActivitiesModel(config);  
  const suscriptorModel = setupSuscriptorModel(config);

  userModel.hasMany(activitiesModel);
  activitiesModel.belongsTo(userModel); 

  // Sync Model to Suscriptor
  activitiesModel.hasMany(suscriptorModel);
  suscriptorModel.belongsTo(activitiesModel);

  userModel.hasMany(suscriptorModel);
  suscriptorModel.belongsTo(userModel);

  await sequelize.authenticate();  
  await sequelize.sync({ force: true });

};
