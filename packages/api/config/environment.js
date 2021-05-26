const dotenv = require('dotenv')
const path = require("path");

let environment
let pathEnv

switch (process.env.NODE_ENV) {
    case 'prod':
        environment = "";
        pathEnv = path.resolve(__dirname,"..",'.env')
        break;

    default:
        environment = "DEV_";
        pathEnv = path.resolve(__dirname,"..",'.env')
        break;
}

dotenv.config({ path:pathEnv });

module.exports = environment;