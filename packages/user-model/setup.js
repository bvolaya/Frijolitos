
const sequelize = require("postgres-db-connect");

const setupUserModel = require("./src/entities/user");
const setupUserPsicologoModel = require("./src/entities/userPsicologo");
const setupProfileModel = require("./src/entities/profile");
async function setup() {
  const userModel = setupUserModel();
  const userModelPicologo = setupUserPsicologoModel();
  const profileModel = setupProfileModel();

  userModel.hasOne(profileModel);
  userModelPicologo.hasOne(profileModel);
  profileModel.belongsTo(userModel);
  profileModel.belongsTo(userModelPicologo);
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
};

setup()