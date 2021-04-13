const sequelize = require('sequelize');
const {Sequelize} = require('sequelize')
const logger = require("./utils/logger");
const config = require('../config/database')

const db = new Sequelize(config.postgres.database,config.postgres.user, config.postgres.pass, {
    host: config.postgres.host,
    dialect: Object.keys(config)[0]
})

db.authenticate()
  .then((e) => {
    logger.info("[fr-postgresdbconnection-module]: Connection with the DB");
  })
  .catch((e) =>
    logger.error(
      `[fr-postgresdbconnection-module]: Connection error event: ${e.message}`
    )
  );

module.exports = db;