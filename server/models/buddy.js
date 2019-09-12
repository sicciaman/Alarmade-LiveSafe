const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BuddySchema = new Schema ({
    name: String,
    photos: [{
        data: Buffer,
        contentType: String
    }]
});

const Buddy = module.exports = mongoose.model('buddy', BuddySchema);