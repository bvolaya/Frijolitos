const multer = require('fastify-multer')
require("./environment");

function store(path){
    let storage;
    if (process.env.NODE_ENV === 'prod'){
        storage = multer.memoryStorage()
        return multer({ storage: storage })
    }else {
        storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path)
            },
            filename: function (req, file, cb) {
                cb(null,   Date.now()+'-'+file.originalname)
            }
        })
        return multer({ storage: storage })
    }
}

module.exports = {
    store
}

