var express = require('express');
var router = express.Router();
var passport = require('passport');
var Person = require('./../models/person');

router.get('/', isLoggedIn, function (req, res) {
	Person.find().populate('documents').exec(function (err, users) {
		if (err) console.log(err);
		// вот эта операция совсем не очевидная в Mongo.
		// мало того, что пришлось второй раз "нырять" за данными
		// так еще и потребовалось указать нужную модель,
		// несмотря на то, что в референсе она уже была указана
		Person.populate(users, { path: 'documents.doctype', model: 'Doctype' }, function (err, some) {
			if (err) console.log(err);
			res.render('index', { title: 'Express', persons: persons });
		});
	});
});

router.get('/signin', function (req, res) {
	res.render('signin', { message: req.flash('error') });
});

router.post('/signin', passport.authenticate('local-signin', {
	successRedirect: '/',
	failureRedirect: '/signin',
	failureFlash: true
}));

router.get('/signup', function (req, res) {
	res.render('signup', { message: req.flash('error') });
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/',
	failureRedirect: '/signup',
	failureFlash: true
}));

// функция для проверки аутентификации
function isLoggedIn(req, res, next) {
	// если пользователь авторизован, идем дальше
	if (req.isAuthenticated()) return next();
	// если нет, то редиректим на страницу логина
	res.redirect('/signin');
}

module.exports = router;
