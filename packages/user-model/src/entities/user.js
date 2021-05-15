const Sequelize = require("sequelize");
const sequelize = require("postgres-db-connect");

module.exports = function setupUserModel() {  

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
    rol: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "participant"
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};
