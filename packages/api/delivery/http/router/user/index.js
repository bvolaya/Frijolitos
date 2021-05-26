const { user } = require("../../../../adapter");
const  {store} = require('../../../../config/multer')
/*const multer = require('fastify-multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/user')
    },
    filename: function (req, file, cb) {
        cb(null,   Date.now()+'-'+file.originalname)
    }
})
const upload = multer({ storage: storage })*/

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
