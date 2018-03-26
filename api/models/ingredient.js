var mongoose = require('mongoose');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');
var Schema = mongoose.Schema;
var defaultImgPath = config.web.url + '/imgs/ingredients/';

var IngredientSchema = new Schema({
	no: { type: String, required: true, index: { unique: true } },
	theme: { type: String, required: true },
	name: { type: String, required: true },
	imagePath: { type: String, required: true, default: defaultImgPath + 'img_default.jpg' },
	description: { type: String, required: true }
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
