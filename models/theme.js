var mongoose = require('mongoose');
// var async = require('async');
var Schema = mongoose.Schema;
var defaultImgPath = 'https://indiscent.herokuapp.com/imgs/themes/';

var ThemeSchema = new Schema({
	no: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	ingredients: { type: [Schema.Types.Mixed] },
	imagePath: { type: String, required: true, default: defaultImgPath + 'img_default.jpg' }
});

module.exports = mongoose.model('Theme', ThemeSchema);
