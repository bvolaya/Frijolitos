const { user } = require("../../../../adapter");

async function linkRouter(fastify) {
  fastify.post("/register", user.createUser);
  fastify.post("/login", user.loginUser);
}

module.exports = linkRouter;
