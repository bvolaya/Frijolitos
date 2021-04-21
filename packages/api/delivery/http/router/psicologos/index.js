const { psicologo } = require("../../../../adapter");

async function registroPsicologosRute(fastify) {
  fastify.post("/register/psicologos", psicologo.createUserPsicologos());
  fastify.post("/login/psicologos", psicologo.loginUser);
}

module.exports = registroPsicologosRute;
