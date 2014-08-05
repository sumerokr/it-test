var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = Schema({
    serial: String,
    number: String,
    releaseDate: {
    	type: Date,
    	get: formatDate
    },
    doctype: {
        type: Schema.Types.ObjectId,
        ref: 'Doctype'
    }
});

function formatDate (val) {
    var day = val.getDate();
    var month = val.getMonth() + 1;
    var year = val.getFullYear();

    if (!val) return val;
    return day + '.' + month + '.' + year;
}

module.exports = mongoose.model('Document', documentSchema);
