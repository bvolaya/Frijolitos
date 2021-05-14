const Sequelize = require("sequelize");
const sequelize = require("postgres-db-connect");

module.exports = function setupProfilePsycologyModel() {

    return sequelize.define("profilePsycology", {
        cc: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        urlcc: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        profesionalcard: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        urlcard: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        img: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        direction: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        yeargraduation: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });
};