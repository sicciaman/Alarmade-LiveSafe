const mongoose = require('mongoose');
const Device = require('./device');
const Schema = mongoose.Schema;
//const d = mongoose.model(Device.schema);


//define user Schema
const UserSchema = new Schema ({
  username: String,
  password: String,
  devices: [Device.schema],
});


UserSchema
.virtual('getUsername')
.get(function () {
  return this.username
});

UserSchema
.virtual('url')
.get(function () {
  return '/user/' + this._id;
});

//Export Mongoose Model
const User = module.exports = mongoose.model('user', UserSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}