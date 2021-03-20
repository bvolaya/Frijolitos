const Sequelize = require("sequelize");
const setupDatabase = require("../utils/conecion");

module.exports = function setupProfileModel(config) {
    
  const sequelize = setupDatabase(config);

  return sequelize.define("profile", {
    nickName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rol: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
};
