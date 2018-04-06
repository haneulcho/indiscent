var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var config = (process.env.NODE_ENV == 'production') ? require('../config/config') : require('../config/config.dev');
var defaultImgPath = config.web.url + '/imgs/ingredients/';

var connection = mongoose.createConnection(config.mongoDB.dbUrl);
autoIncrement.initialize(connection);

var IngredientSchema = new Schema({
	theme: { type: String, required: true },
	name: { type: String, required: true },
	imagePath: { type: String, required: true, default: defaultImgPath + 'img_default.jpg' },
	description: { type: String, required: true }
});

IngredientSchema.plugin(autoIncrement.plugin, { model: 'Ingredient', field: 'id', startAt: 1 });
var Ingredient = connection.model('Ingredient', IngredientSchema);

module.exports = Ingredient;
