const Sequelize = require("sequelize");
const sequelize = require("postgres-db-connect");

module.exports = function setupUserPsiologoModel() {  

  return sequelize.define("psicologo", {
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
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    isVerify: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    document: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
  });
};
