const Sequelize = require("sequelize");
const sequelize = require("postgres-db-connect");

module.exports = function setupProfilePsycologyModel() {

    return sequelize.define("profilePsycology", {
        cc: {
            type: Sequelize.INTEGER,
            allowNull: true,
            unique: true
        },
        urlcc: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        profesionalcard: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
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
        },
        userId:{
            type: Sequelize.INTEGER,
            allowNull: true,
            unique: true
        }
    });
};