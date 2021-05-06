const {basicMetrics} = require('metrics')

async function getBasicMetrics(req, reply) {
    const { userId } = req.params;

    req.log.info(`get metrics by user ${userId}`);

    try{
        const metric = await basicMetrics(userId);
        reply
            .code(200)
            .headers("Content-Type", "application/json; charset=utf-8")
            .send({ userId,
                metric
            });
    } catch (error) {
        console.log(error);
        reply
            .code(500)
            .headers("Content-Type", "application/json; charset=utf-8")
            .send({ data: "Error Interno " + error.message });
    }

}

module.exports = {getBasicMetrics}