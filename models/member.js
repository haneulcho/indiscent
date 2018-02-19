var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
	id: { type: String, ruqired: true, unique: true },
	name: {
		first: { type: String, required: true },
		last: { type: String, required: true }
	},
	sex: { type: String, required: true },
	hp: { type: String, required: true },
	address: {
		lines: { type: [String] },
		city: { type: String },
		state: { type: String }
	},
	isEarlyBird: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('Member', MemberSchema);