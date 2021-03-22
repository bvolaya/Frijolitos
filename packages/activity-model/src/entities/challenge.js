const Sequelize = require("sequelize");
const setupDatabase = require("../utils/conecion");

module.exports = function setupChallengeModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define("challenge", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    direction: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue:
        "https://gravatar.com/avatar/3e4c1a7e8f6752820fd325aa4b119099?s=400&d=robohash&r=x",
    },
    categorie: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: true
    }
  });
};
