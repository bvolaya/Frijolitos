const Sequelize = require("sequelize");
const sequelize = require("postgres-db-connect");

module.exports = function setupProfileModel(config) {
  
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
    },
  });
};
