const { search } = require("../../../../adapter");

async function searchRouter(fastify) {
    fastify.get("/search/:term", search.searching);
}

module.exports = searchRouter;
