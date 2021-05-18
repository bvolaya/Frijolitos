const profileParticipant = require('./profile-participant')
const profilePsycology = require('./profile-psycology')
const user = require('./user')

module.exports = {
    setupProfileParticipantModel:profileParticipant,
    setupProfilePsycologyModel:profilePsycology,
    setupUserModel:user
}