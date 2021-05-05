const { QueryTypes } = require("sequelize");
const sequelize = require("postgres-db-connect");
const logger = require("../utils/logger");

async function getBasicMetrics(userId) {
    if (userId){
        try {
            let challengeProcess = await sequelize.query(`
            select count("userId") as challengeProcess from suscriptors where "userId" = ${userId}
                and "isActive" = true and state is 'process'
            group by "userId"
            `,{type:QueryTypes.SELECT})
            let challengeFinished = await sequelize.query(`
            select count("userId") as challengeFinished from suscriptors where "userId" = ${userId}
                and "isActive" = true and state is 'finished'
            group by "userId"
            `,{type:QueryTypes.SELECT})

            return {
                process: challengeProcess[0].challengeProcess,
                finished: challengeFinished[0].challengeFinished
            }
        }catch (e) {
            logger.error(`[fr-metrics-module]: Error ${e.message}`)
        }
    }
}

module.exports = {
    getBasicMetrics
}