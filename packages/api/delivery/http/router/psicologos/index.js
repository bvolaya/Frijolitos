const {regPsicologos } = require("../../../../adapter");

async function registroPsicologosRute(fastify) {
  fastify.post("/registroPsicologos", regPsicologos.createUserPsicologos);
  fastify.post("/loginPsicologo", regPsicologos.loginUser);
}

module.exports = registroPsicologosRouter;
