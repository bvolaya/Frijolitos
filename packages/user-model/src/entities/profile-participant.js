const Sequelize = require("sequelize");
const sequelize = require("postgres-db-connect");

module.exports = function setupProfileParticipantModel() {
  
  return sequelize.define("profileParticipant", {
    nickName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING,
      allowNull: false,
    },

  });
};
