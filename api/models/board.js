var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
	subject: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: false },
	contents: { type: String, required: true }
});


module.exports = mongoose.model('Board', BoardSchema);
