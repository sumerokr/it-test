var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var passport = require('./config/passport');

// var User = require('./models/user.js');
// var Person = require('./models/person.js');
// var Document = require('./models/document.js');
// var Doctype = require('./models/doctype.js');

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


// var doctypePasport = new Doctype({ name: 'Pasport' });
// var doctypeInn = new Doctype({ name: 'INN' });

// var pasportVladimir = new Document({ serial: '80 05', number: '863975', releaseDate: new Date(2004, 05, 16), doctype: doctypePasport.id });
// var innVladimir = new Document({ serial: '34 56', number: '954753', releaseDate: new Date(2002, 04, 26), doctype: doctypeInn.id });
// var personVladimir = new Person({ firstName: 'Владимир', middleName: 'Владимирович', lastName: 'Бутин', documents: [pasportVladimir.id, innVladimir.id] });

// var pasportDmitry = new Document({ serial: '80 03', number: '156483', releaseDate: new Date(2009, 02, 09), doctype: doctypePasport.id });
// var innDmitry = new Document({ serial: '82 16', number: '351785', releaseDate: new Date(2013, 11, 18), doctype: doctypeInn.id });
// var personDmitry = new Person({ firstName: 'Дмитрий', middleName: 'Анатольевич', lastName: 'Недведев', documents: [pasportDmitry.id, innDmitry.id] });

// var pasportSergey = new Document({ serial: '36 42', number: '362147', releaseDate: new Date(2001, 03, 04), doctype: doctypePasport.id });
// var innSergey = new Document({ serial: '82 16', number: '951475', releaseDate: new Date(2003, 06, 17), doctype: doctypeInn.id });
// var personSergey = new Person({ firstName: 'Сергей', middleName: 'Аркадьевич', lastName: 'Любинин', documents: [pasportDmitry.id, innDmitry.id] });

// var pasportNikolay = new Document({ serial: '24 13', number: '824683', releaseDate: new Date(2007, 02, 24), doctype: doctypePasport.id });
// var innNikolay = new Document({ serial: '82 16', number: '753219', releaseDate: new Date(2004, 08, 20), doctype: doctypeInn.id });
// var personNikolay = new Person({ firstName: 'Николай', middleName: 'Васильевич', lastName: 'Моголь', documents: [pasportDmitry.id, innDmitry.id] });

// var pasportAlexander = new Document({ serial: '18 36', number: '319725', releaseDate: new Date(1999, 11, 10), doctype: doctypePasport.id });
// var innAlexander = new Document({ serial: '82 16', number: '315824', releaseDate: new Date(1996, 10, 13), doctype: doctypeInn.id });
// var personAlexander = new Person({ firstName: 'Александр', middleName: 'Сергеевич', lastName: 'Сушкин', documents: [pasportDmitry.id, innDmitry.id] });

// doctypePasport.save(function (err) {
// if (err) console.log(err);
// console.log('doctype saved');
// });
// doctypeInn.save(function (err) {
// if (err) console.log(err);
// console.log('doctype saved');
// });

// pasportVladimir.save(function (err) {
// if (err) console.log(err);
// console.log('pasport saved');
// });
// innVladimir.save(function (err) {
// if (err) console.log(err);
// console.log('pasport saved');
// });
// personVladimir.save(function (err) {
// if (err) console.log(err);
// console.log('person saved');
// });

// pasportDmitry.save(function (err) {
// if (err) console.log(err);
// console.log('pasport saved');
// });
// innDmitry.save(function (err) {
// if (err) console.log(err);
// console.log('pasport saved');
// });
// personDmitry.save(function (err) {
// if (err) console.log(err);
// console.log('person saved');
// });

// pasportSergey.save(function (err) {
// if (err) console.log(err);
// console.log('pasport saved');
// });
// innSergey.save(function (err) {
// if (err) console.log(err);
// console.log('pasport saved');
// });
// personSergey.save(function (err) {
// if (err) console.log(err);
// console.log('person saved');
// });

// pasportNikolay.save(function (err) {
// if (err) console.log(err);
// console.log('pasport saved');
// });
// innNikolay.save(function (err) {
// if (err) console.log(err);
// console.log('pasport saved');
// });
// personNikolay.save(function (err) {
// if (err) console.log(err);
// console.log('person saved');
// });

// pasportAlexander.save(function (err) {
// if (err) console.log(err);
// console.log('pasport saved');
// });
// innAlexander.save(function (err) {
// if (err) console.log(err);
// console.log('pasport saved');
// });
// personAlexander.save(function (err) {
// if (err) console.log(err);
// console.log('person saved');
// });


app.listen('3000', function () {
	console.log('Express server listening on port :3000');
});