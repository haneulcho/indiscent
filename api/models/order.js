var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');

var connection = mongoose.createConnection(config.mongoDB.dbUrl);
autoIncrement.initialize(connection);

var OrderSchema = new Schema({
	username: { type: Schema.Types.ObjectId, ref: 'User', required: false },
	name: { type: String, required: true },
	created_at: { type: Date, default: Date.now() },
	edited_at: { type: Date, default: Date.now() }, 
	gender: { type: String, required: false },
	hp: { type: String, required: true },
	address: { type: String },
	isEarlyBird: { type: Boolean, required: false, default: true },
	base: { type: String, required: true },
	love_theme: {
		first: { type: String, required: true },
		second: { type: String, required: true }
	},
	hate_theme: { type: [String], required: false },
	love_ingre: { type: [String], required: true },
	hate_ingre: { type: [String], required: false },
	comment: { type: String }
});

OrderSchema.plugin(autoIncrement.plugin, { model: 'Order', field: 'id', startAt: 1 });
var Order = connection.model('Order', OrderSchema);

module.exports = Order;
