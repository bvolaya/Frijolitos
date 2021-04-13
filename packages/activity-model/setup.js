const sequelize = require("postgres-db-connect");
const setupUserModel = require("@frijol/user-model/src/entities/user");
const setupActivitiesModel = require("./src/entities/challenge");
const setupSuscriptorModel = require("./src/entities/suscriptor");

async function setup() {
  // Sync Model to Activities
  const userModel = setupUserModel();
  const activitiesModel = setupActivitiesModel();
  const suscriptorModel = setupSuscriptorModel();

  userModel.hasMany(activitiesModel);
  activitiesModel.belongsTo(userModel);

  // Sync Model to Suscriptor
  activitiesModel.hasMany(suscriptorModel);
  suscriptorModel.belongsTo(activitiesModel);

  userModel.hasMany(suscriptorModel);
  suscriptorModel.belongsTo(userModel);

  await sequelize.authenticate();
  await sequelize.sync({ force: true });
}

setup();
