var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./../models/user');
// var Document = require('./../models/document');
// var Doctype = require('./../models/doctype');

app.get('/login', function (req, res) {
	res.render('login');
});

app.post('/login', passport.authenticate('local', {
	failureRedirect: '/logon'
}), function (req, res) {
    res.redirect('/');
});