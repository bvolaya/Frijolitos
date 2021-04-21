const {searchBasic} = require('@frijoles/search')

async function searching(req, reply) {
    const { term } = req.params;
    req.log.info(`Searching activity ${term}`);

    try {
        const activity = await searchBasic(term);
        reply
            .code(200)
            .headers("Content-Type", "application/json; charset=utf-8")
            .send({ data: activity });
    } catch (error) {
        console.log(error);
        reply
            .code(500)
            .headers("Content-Type", "application/json; charset=utf-8")
            .send({ data: "Error Interno " + error.message });
    }

}

module.exports = {searching}