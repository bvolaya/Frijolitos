
const sequelize = require("postgres-db-connect");
const {
  setupProfileParticipantModel,
  setupProfilePsycologyModel,
  setupUserModel} = require('./src/entities')

async function setup() {
  const userModel = setupUserModel();
  const profilePsycology = setupProfilePsycologyModel();
  const profileParticipant = setupProfileParticipantModel();

  userModel.hasOne(profilePsycology);
  profilePsycology.belongsTo(userModel);

  userModel.hasOne(profileParticipant);
  profileParticipant.belongsTo(userModel);

  await sequelize.authenticate();
  await sequelize.sync({ force: true });
}

setup()