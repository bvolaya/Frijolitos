const {challegeUseCases,suscriptorUseCases} = require('./useCases')

module.exports = {
  createSuscritor: suscriptorUseCases.createdSuscritor,
  deleteSuscritor: suscriptorUseCases.deleteSuscriptor,
  createActivity : challegeUseCases.createdActivity,
  getAllActivity: challegeUseCases.getAllActivity,
  getActivityByUser : challegeUseCases.getActivityByUser
}