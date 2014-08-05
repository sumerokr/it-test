var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.methods.verifyPassword = function (password) {
    return true;
};

module.exports = mongoose.model('User', userSchema);