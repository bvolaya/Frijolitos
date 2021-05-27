const { user } = require("../../../../adapter");
const  {store} = require('../../../../config/multer')

async function linkRouter(fastify) {
    let upload = process.env.NODE_ENV === 'prod' ? store() : store('tmp/user')

  fastify.post("/register"
      ,{ preHandler: upload.fields([
          { name: 'imgProfile', maxCount: 1 },
          { name: 'imgCC', maxCount: 1 },
          { name: 'imgCard', maxCount: 1 }
        ]) }
      , user.createUser)

  fastify.post("/login", user.loginUser);
}

module.exports = linkRouter;
