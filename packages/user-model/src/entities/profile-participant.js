const Sequelize = require("sequelize");
const sequelize = require("postgres-db-connect");

module.exports = function setupProfileParticipantModel() {
  
  return sequelize.define("profileParticipant", {
    nickName: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    img: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    userId:{
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: true
    }

  });
};
