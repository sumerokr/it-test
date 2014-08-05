var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctypeSchema = Schema({
    name: String
});

module.exports = mongoose.model('Doctype', doctypeSchema);
