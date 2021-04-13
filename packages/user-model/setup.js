
const sequelize = require("postgres-db-connect");

const setupUserModel = require("./src/entities/user");
const setupProfileModel = require("./src/entities/profile");
async function setup() {
  const userModel = setupUserModel();
  const profileModel = setupProfileModel();

  userModel.hasOne(profileModel);
  profileModel.belongsTo(userModel);
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
};

setup()