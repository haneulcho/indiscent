var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');
var defaultImgPath = config.web.url + '/imgs/themes/';

var connection = mongoose.createConnection(config.mongoDB.dbUrl);
autoIncrement.initialize(connection);

var ThemeSchema = new Schema({
	name: { type: String, required: true },
	ingredients: { type: [Schema.Types.Mixed] },
	imagePath: { type: String, required: true, default: defaultImgPath + 'img_default.jpg' }
});

ThemeSchema.plugin(autoIncrement.plugin, { model: 'Theme', field: 'id', startAt: 1 });
var Theme = connection.model('Theme', ThemeSchema);

module.exports = Theme;
