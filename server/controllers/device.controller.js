User = require('../models/user');
Device = require('../models/device');


module.exports = {
    index,
    newDevice,
    setStatus,
    deleteDevice
};

// GET all devices of current user
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
    User.updateOne({username: req.params.user_id}, updateField, function (err, user) {
        if (err)
            res.json(err);
        res.json({
            message: 'User found!',
            data: user
        });
    });
};

// Set device status
function setStatus (req, res) {
    User.find({username: req.params.user_id}, function(err, user) {
        if (err)
            res.json(err);
        user[0].devices.forEach((dev) => {
            console.log(dev._id);
            console.log(req.params.device_id);
            console.log("----------------")
            if (String(dev._id) === req.params.device_id) {
                dev.status = req.body.status;
                user[0].save();
                res.json({
                    status: "success",
                    message: 'Status updated',
                    data: user[0]
                });
            }
        }); 
    }); 
}

// Handle delete device
function deleteDevice (req, res) {
    User.updateOne({username: req.params.user_id}, {  $pull: { devices: { _id: req.params.device_id}}}, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Device deleted'
        });
    });
};