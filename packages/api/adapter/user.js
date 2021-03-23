const { createdUser,login } = require("@frijol/user-model/src/useCases/user");

async function createUser(req, reply) {

  const data = req.body;
  req.log.info(`Creating user ${data.firstName}`);

  try {
    const User = await createdUser(data);
    reply
      .code(201)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: User });
  } catch (error) {
    console.log(error);
    reply
      .code(500)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: "Error Interno" });
  }
  
}

async function loginUser(req, reply) {
  console.log("Req" + req.body);
  const data = req.body;
  console.log(data);
  req.log.info(`Loging user ${data.mail}`);

  try {
    const User = await login(data);
    reply
      .code(201)
      .headers("Content-Type", "application/json; charset=utf-8")
      .send({ data: User });
  } catch (error) {
    if (error.message == "Password Invalid") {
      reply
        .code(401)
        .headers("Content-Type", "application/json; charset=utf-8")
        .send({ data: error.message });

    } else if (error.message == "The User don't exist") {
      reply
        .code(404)
        .headers("Content-Type", "application/json; charset=utf-8")
        .send({ data: error.message });
    } else {
      console.log(error);
      reply
        .code(500)
        .headers("Content-Type", "application/json; charset=utf-8")
        .send({ data: "Error Interno" });
    }    
  }
}

module.exports = {
  createUser,
  loginUser,
};
