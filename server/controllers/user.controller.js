User = require('../models/user');

module.exports = {
  index,
  newUser,
  deleteUser
};

// Handle get User actions
function index (req, res) {
  User.get(function (err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "users retrieved successfully",
      data: users
    });
  });
};

// Handle create user actions
function newUser (req, res) {
  const user = new User();
  user.username = req.body.username ? req.body.username : user.username;
  user.password = req.body.password;

  // save the user and check for errors
  user.save(function (err) {
    if (err)
      res.json(err);
    res.json({
      message: 'New User created!',
      data: user
    });
  });
};

// Handle delete user
function deleteUser (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};