const Sequelize = require("sequelize");
const sequelize = require("postgres-db-connect");

module.exports = function setupSuscriptorModel() {
   return sequelize.define("suscriptor", {    
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
       state: {
           type: Sequelize.STRING,
           allowNull: false,
           defaultValue: "process"
       }
  });
};
