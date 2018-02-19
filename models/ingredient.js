var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var defaultImgPath = 'https://indiscent.herokuapp.com/imgs/ingredients/';

var IngredientSchema = new Schema({
	no: { type: String, required: true, unique: true },
	theme: { type: String, required: true },
	name: { type: String, required: true },
	imagePath: { type: String, required: true, default: defaultImgPath + 'img_default.jpg' },
	description: { type: String, required: true }
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
