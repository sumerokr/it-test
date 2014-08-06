var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    documents: [{
        type: Schema.Types.ObjectId,
        ref: 'Document'
    }]
});

personSchema.virtual('fullName').get(function () {
	return this.firstName + ' ' + this.middleName + ' ' + this.lastName;
});

module.exports = mongoose.model('Person', personSchema);