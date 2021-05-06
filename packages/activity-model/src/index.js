const {challegeUseCases,suscriptorUseCases} = require('./useCases')

module.exports = {
  createSuscritor: suscriptorUseCases.createdSuscritor,
  deleteSuscriptor: suscriptorUseCases.deleteSuscriptor,
  createActivity : challegeUseCases.createdActivity,
  getAllActivity: challegeUseCases.getAllActivity,
  getActivityByUser : challegeUseCases.getActivityByUser,
  changeActivity : challegeUseCases.modifyActivity
}