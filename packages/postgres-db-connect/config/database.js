const env = require("./environment");

module.exports = {
  postgres: {
    host: process.env[`${env}POSTGRES_HOST`] || "",
    database: process.env[`${env}POSTGRES_DATABASE`] || "",
    user: process.env[`${env}POSTGRES_USER`] || "",
    pass: process.env[`${env}POSTGRES_PASS`] || "",
  },
};
