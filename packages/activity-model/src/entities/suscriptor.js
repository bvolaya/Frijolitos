const Sequelize = require("sequelize");
const setupDatabase = require("../utils/conecion");

module.exports = function setupSuscriptorModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define("suscriptor", {    
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
