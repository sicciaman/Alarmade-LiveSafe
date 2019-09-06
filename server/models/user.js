const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//define user Schema
const UserSchema = new Schema ({
  username: String,
  password: String
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