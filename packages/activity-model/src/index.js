const {challegeUseCases,suscriptorUseCases} = require('./useCases')

module.exports = {
  createSuscritor: suscriptorUseCases.createdSuscritor,
  createActivity : challegeUseCases.createdActivity,
  getAllActivity: challegeUseCases.getAllActivity,
  getActivityByUser : challegeUseCases.getActivityByUser
}