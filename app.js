var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('./config/passport');

var Person = require('./models/person.js');
var Document = require('./models/document.js');
var Doctype = require('./models/doctype.js');

var routes = require('./routes/index');


app.set('view engine', 'jade');


mongoose.connect('mongodb://sumerokr:sumepass@kahana.mongohq.com:10045/sume_db');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () { console.log('connection open'); });


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', routes);


app.listen('3000', function () {
    console.log('Express server listening on port :3000');
});