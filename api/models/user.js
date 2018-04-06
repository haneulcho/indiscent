var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');

var connection = mongoose.createConnection(config.mongoDB.dbUrl);
autoIncrement.initialize(connection);

var UserSchema = new Schema({
	username: { type: String, ruqired: true },
	created_at: { type: Date, default: Date.now() },
	name: { type: String, required: true },
	gender: { type: String, required: true },
	hp: { type: String, required: true },
	address: {
		lines: { type: [String] },
		city: { type: String },
		state: { type: String }
	}
});

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'id', startAt: 1 });
var User = connection.model('User', UserSchema);

module.exports = User;
