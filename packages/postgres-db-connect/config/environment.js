const dotenv = require('dotenv')
const path = require("path");

const {env} = require('../src/utils/constants')
let environment
let pathEnv

switch (process.env.NODE_ENV) {
    case env.PRODUCTION:
        environment = "";
        pathEnv = "/src/.env";
        break;

    default:
        environment = "DEV_";
        pathEnv = path.resolve("../postgres-db-connect",'.env')
        break;
}

dotenv.config({ path:pathEnv });

module.exports = environment;