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


router.route('/users')
  .get(userController.index)
  .post(userController.newUser);

router.route('/users/:user_id')
  .delete(userController.deleteUser);

router.route('/users/:user_id/devices')
  .get(deviceController.index)
  .put(deviceController.newDevice)

router.route('/users/devices/:device_id')
  .put(deviceController.deleteDevice);

//Export API routes
module.exports = router;