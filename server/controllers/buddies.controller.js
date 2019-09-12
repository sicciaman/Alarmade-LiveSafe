User = require('../models/user');
Device = require('../models/device');
Buddy = require('../models/buddy');


module.exports = {
    index,
};

function index (req, res) {
    User.find({username: req.params.user_id}, function (err, user) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        user[0].devices.forEach(device => {
            console.log(device._id)
            console.log(req.params.device_id)
            if (String(device._id) === String(req.params.device_id)) {
                res.json({
                    status: "success",
                    message: "buddies retrieved successfully",
                    data: device.members
                });
            }
        });
        res.json({
            status: "error",
            message: "Device not found"
        });
    });
}