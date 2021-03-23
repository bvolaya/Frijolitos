
const db = require("../user-model/index");

async function setup() {
  const config = {
    database: process.env.DB_NAME || "postgres",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "mysecretpassword",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    setup: true,
  };

  await db(config).catch(handleFatalError);

  console.log("Success!");
  process.exit(0);
}

function handleFatalError(err) {
  console.error(err.message);
  console.error(err.stack);
  process.exit(1);
}

setup();
