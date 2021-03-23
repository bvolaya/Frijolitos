
module.exports = {
  database: process.env.DB_NAME || "postgres",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "mysecretpassword",
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  setup: true,
}
