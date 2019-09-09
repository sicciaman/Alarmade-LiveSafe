User = require('../models/user');
Device = require('../models/device');


module.exports = {
    index,
    newDevice,
    deleteDevice
};

function index (req, res) {
    User.find({username: req.params.user_id}, function (err, user) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            message: "devices retrieved successfully",
            data: user[0].devices
        });
    });
    
};

// Handle create new device
function newDevice (req, res) {
    const device = new Device();
    device.name = req.body.name;
    device.ip = req.body.ip;

    updateField = { $push: {devices: device}}
    
    // save the device and check for errors
    User.updateOne({username: "gallo"}, updateField, function (err, user) {
        if (err)
            res.json(err);
        res.json({
            message: 'User found!',
            data: user
        });
    });
};

// Handle delete device
function deleteDevice (req, res) {
    User.updateOne({username: "gallo"}, {  $pull: { devices: { _id: req.params.device_id}}}, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Device deleted'
        });
    });
};