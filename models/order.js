var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	name: { type: String, required: true },
	odate: { type: Date, default: Date.now },
	isEarlyBird: { type: Boolean, required: false, default: false },
	gender: { type: String, required: false },
	hp: { type: String, required: true },
	address: { type: String },
	base: { type: String, required: true },
	love_theme: {
		first: { type: String, required: true },
		second: { type: String, required: true }
	},
	hate_theme: { type: [String], required: true },
	love_ingre: { type: [String], required: true },
	hate_ingre: { type: [String], required: false }
});

module.exports = mongoose.model('Order', OrderSchema);
