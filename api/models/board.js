var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');

var connection = mongoose.createConnection(config.mongoDB.dbUrl);
autoIncrement.initialize(connection);

var BoardSchema = new Schema({
	subject: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: false },
	contents: { type: String, required: true }
});

BoardSchema.plugin(autoIncrement.plugin, { model: 'Board', field: 'id', startAt: 1 });
var Board = connection.model('Board', BoardSchema);

module.exports = Board;
