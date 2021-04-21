const { regPsicologos } = require("../../../../adapter");

async function registroPsicologosRute(fastify) {
  fastify.post("/registerPsicologos", regPsicologos.createUserPsicologos);
  fastify.post("/login", regPsicologos.loginUser);
}

module.exports = linkRouter;
