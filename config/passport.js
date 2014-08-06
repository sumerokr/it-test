var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./../models/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local-signin', new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Пользователь не найден' }); }
        if (!user.verifyPassword(password)) { return done(null, false, { message: 'Неверная пара логин:пароль' }); }
        return done(null, user);
    });
}));

passport.use('local-signup', new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        var newUser;
        if (err) { return done(err); }
        if (user) {
            return done(null, false, { message: 'Пользователь с таким именем уже существует' });
        } else {
            newUser = new User();
            newUser.username = username;
            newUser.password = password;

            newUser.save(function (err) {
                if (err) console.log(err);
                return done(null, newUser);
            });
        }
    });    
}));

module.exports = passport;
