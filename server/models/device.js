const mongoose = require('mongoose');
const Buddy = require('./buddy');
const Schema = mongoose.Schema;

//define user Schema
const DeviceSchema = new Schema ({
    name: String,
    ip: String,
    port: String,
    status: {
        type: Boolean,
        default: false
    },
    members: [Buddy.schema]
});


//Export Mongoose Model
const Device = module.exports = mongoose.model('device', DeviceSchema);
