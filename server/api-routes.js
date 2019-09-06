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

router.route('/users')
  .get(userController.index)
  .post(userController.newUser);

router.route('/users/:user_id')
  .delete(userController.deleteUser);

//Export API routes
module.exports = router;