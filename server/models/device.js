const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//define user Schema
const DeviceSchema = new Schema ({
    name: String,
    ip: String,
    port: String,
    members: [{
        name: String, 
        photos: [{
            data: Buffer,
            contentType: String
        }]
    }]
});


//Export Mongoose Model
const Device = module.exports = mongoose.model('device', DeviceSchema);
