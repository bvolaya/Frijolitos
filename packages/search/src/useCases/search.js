
const { QueryTypes } = require("sequelize");
const sequelize = require("postgres-db-connect");
const logger = require("../utils/logger");
const {search} = require('../entities')

async function searchActivities(term) {

    try {
        logger.info(`[fr-search-module]: Searching term: ${term}`)
        let results = await sequelize.query(`
            select * from challenges where title ~* '${term}' or description ~* '${term}';
        `, {type:QueryTypes.SELECT})

        return  new search(term,results);

    }catch (error){
        logger.error(`[fr-search-module]: Error ${error.message} searching term: ${term}`)
    }
}

module.exports = {searchActivities}