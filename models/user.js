var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    username: {
        type: String,
        required: 'Обязательное поле'
    },
    password: {
        type: String,
        required: 'Обязательное поле'
    }
});

userSchema.methods.verifyPassword = function (password) {
    return this.password === password;
};

module.exports = mongoose.model('User', userSchema);