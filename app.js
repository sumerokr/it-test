var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

app.set('view engine', 'jade');


var userSchema = mongoose.Schema({
    firstName: String,
    password: String
});
userSchema.methods.verifyPassword = function (password) {
    return this.password === password;
};
var User = mongoose.model('User', userSchema);


passport.serializeUser(function (user, done) {
	done(null, user.id);
});
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});
passport.use(new LocalStrategy({
		usernameField : 'firstName',
		passwordField : 'password'
	},
	function(firstName, password, done) {
		User.findOne({ firstName: firstName }, function (err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false, { message: 'No user found.' }); }
			if (!user.verifyPassword(password)) { return done(null, false, { message: 'Oops! Wrong password.' }); }
			return done(null, user);
		});
	}
));


mongoose.connect('mongodb://sumerokr:sumepass@kahana.mongohq.com:10045/sume_db');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () { console.log('connection open'); });


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.get('/login', function (req, res) {
	console.log(req.flash);
	res.render('login', { message: req.flash('error') });
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

app.listen('3000', function() {
	console.log('Express server listening on port :3000');
});