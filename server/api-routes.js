//Initialize express router
let router = require('express').Router();

//Set default API response
router.get('/', function (req, res) {
  res.json({
    status: 'API its working',
    message: 'Tutto ok!'
  });
});

const userController = require('./controllers/user.controller');
const deviceController = require('./controllers/device.controller');
const buddiesController = require('./controllers/buddies.controller');


router.route('/users')
  .get(userController.index)
  .post(userController.newUser);

router.route('/users/:user_id')
  .delete(userController.deleteUser);

router.route('/users/:user_id/devices')
  .get(deviceController.index)
  .put(deviceController.newDevice);

router.route('/users/:user_id/devices/:device_id')
  .put(deviceController.deleteDevice);

router.route('/users/:user_id/:device_id/buddies')
  .get(buddiesController.index)
  .put(buddiesController.newBuddy);

router.route('/users/:user_id/:device_id/:buddy_id')
  .put(buddiesController.deleteBuddy);

//Export API routes
module.exports = router;