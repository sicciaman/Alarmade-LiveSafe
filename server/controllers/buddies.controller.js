User = require('../models/user');
Device = require('../models/device');
Buddy = require('../models/buddy');


module.exports = {
    index,
    newBuddy,
    deleteBuddy
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
            if (String(device._id) === req.params.device_id) {
                res.json({
                    status: "success",
                    message: "buddies retrieved successfully",
                    data: device.members
                });
            }
        });
    });
}

function newBuddy (req, res) {
    const buddy = new Buddy();
    buddy.name = req.body.name;

    User.find({username: req.params.user_id}, function(err, user) {
        if (err)
            res.json(err);
        user[0].devices.forEach((dev) => {
            console.log(dev._id);
            console.log(req.params.device_id);
            console.log("----------------")
            if (String(dev._id) === req.params.device_id) {
                dev.members.push(buddy);
                user[0].save();
                res.json({
                    status: "success",
                    message: 'Buddy added',
                    data: user[0]
                });
            }
        }); 
    }); 
}

function deleteBuddy (req, res) {
    User.find({username: req.params.user_id}, function(err, user) {
        if (err)
            res.json(err);
        user[0].devices.forEach((dev) => {
            console.log(dev._id);
            console.log(req.params.device_id);
            console.log("----------------")
            if (String(dev._id) === req.params.device_id) {
                dev.members.forEach(member => {
                    if(String(member._id) === req.params.buddy_id) {
                        dev.members.remove(member);
                        user[0].save();
                        res.json({
                            status: "success",
                            message: 'Buddy deleted',
                            data: user[0]
                        });
                    }
                });
            }
        }); 
    }); 
}