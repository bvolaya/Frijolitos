const Sequelize = require("sequelize");
const setupDatabase = require("../../../activity-model/src/utils/conecion");

module.exports = function setupUserModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mail: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    isVerify: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};
