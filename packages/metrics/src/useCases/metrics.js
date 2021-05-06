const { QueryTypes } = require("sequelize");
const sequelize = require("postgres-db-connect");
const logger = require("../utils/logger");

async function getBasicMetrics(userId) {
    if (userId){
        try {
            let challengeProcess = await sequelize.query(`
            select count("userId") as challengeProcess from suscriptors where "userId" = ${userId}
                and "isActive" = true and state = 'process'
            group by "userId"
            `,{type:QueryTypes.SELECT})
            let challengeFinished = await sequelize.query(`
            select count("userId") as challengeFinished from suscriptors where "userId" = ${userId}
                and "isActive" = true and state = 'finished'
            group by "userId"
            `,{type:QueryTypes.SELECT})

            return {
                process: challengeProcess.length > 0 ? parseInt(challengeProcess[0].challengeprocess): 0,
                finished: challengeFinished.length > 0 ? parseInt(challengeProcess[0].challengefinished): 0
            }
        }catch (e) {
            logger.error(`[fr-metrics-module]: Error ${e.message}`)
        }
    }
}

module.exports = {
    getBasicMetrics
}