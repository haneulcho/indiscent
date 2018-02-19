var mongoose = require('mongoose');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');
var Schema = mongoose.Schema;
var defaultImgPath = config.web.url + '/imgs/themes/';

var ThemeSchema = new Schema({
	no: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	ingredients: { type: [Schema.Types.Mixed] },
	imagePath: { type: String, required: true, default: defaultImgPath + 'img_default.jpg' }
});

module.exports = mongoose.model('Theme', ThemeSchema);
