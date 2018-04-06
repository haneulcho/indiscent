var Theme = require('../models/theme');
var Ingredient = require('../models/ingredient');

var Items = {};

Items.theme = {
	findAll: function (req, res, next) {
		Theme.find().exec().then(function (docs) {
			res.status(200).json({ count: docs.length, result: docs });
		}).catch(function (err) {
			res.status(500).json({ error: err });
		});
	},
	findById: function (req, res, next) {
		Theme.findOne({ id: req.params.theme_id }).exec().then(function (doc) {
			if (!doc) {
				res.status(404).json({ message: '해당 테마를 찾을 수 없습니다.' });
			} else {
				res.status(200).json({ result: doc });
			}
		}).catch(function (err) {
			res.status(500).json({ error: err });
		});
	}
};

Items.ingredient = {
	findAll: function (req, res, next) {
		Ingredient.find().exec().then(function (docs) {
			res.status(200).json({ count: docs.length, result: docs });
		}).catch(function (err) {
			res.status(500).json({ error: err });
		});
	},
	findById: function (req, res, next) {
		Ingredient.findOne({ id: req.params.ingredient_id }).exec().then(function (doc) {
			if (!doc) {
				res.status(404).json({ message: '해당 원료를 찾을 수 없습니다.' });
			} else {
				res.status(200).json({ result: doc });
			}
		}).catch(function (err) {
			res.status(500).json({ error: err });
		});
	}
};

module.exports = Items;
