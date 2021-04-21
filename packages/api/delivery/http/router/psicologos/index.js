const { regPsicologos } = require("../../../../adapter");

async function registroPsicologosRute(fastify) {
  fastify.post("/registerPsicologos", user.createUserPsicologos);
  fastify.post("/login", user.loginUser);
}

module.exports = linkRouter;
