const router = require('express').Router();
const StartupController = require('./controllers/StartupsController');

router.route('/startups')
  .get(StartupController.show)
  .post(StartupController.store)

router.route('/startup/:startupId')
  .get(StartupController.index)
  .put(StartupController.update)
  .delete(StartupController.delete)

module.exports = router;