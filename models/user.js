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

// по уму здесь надо было бы еще добавить метод
// для генерации hash-а, но время было на исходе
userSchema.methods.verifyPassword = function (password) {
    return this.password === password;
};

module.exports = mongoose.model('User', userSchema);