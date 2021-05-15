
const sequelize = require("postgres-db-connect");
const {profilePsycology,profileParticipant,user} = require('./src/entities')
const setupUserModel = require("./src/entities/user");
const setupProfileModel = require("./src/entities/profile-participant");
const setupProfileModel = require("./src/entities/profile-participant");
async function setup() {
  const userModel = setupUserModel();
  const profileModel = setupProfileModel();

  userModel.hasOne(profileModel);
  profileModel.belongsTo(userModel);
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
};

setup()