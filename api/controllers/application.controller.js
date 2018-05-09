var Order = require('../models/order');
var Theme = require('../models/theme');
var Ingredient = require('../models/ingredient');
var sendmails = require('../controllers/sendmail.controller');

exports.complete = function (req, res, next) {
	var order = new Order({
		name: req.body.name,
		gender: req.body.gender,
		hp: req.body.hp,
		address: req.body.address,
		isEarlyBird: req.body.isEarlyBird,
		base: req.body.base,
		love_theme: {
			first: req.body.love_theme_first,
			second: req.body.love_theme_second
		},
		hate_theme: req.body.hate_theme,
		love_ingre: req.body.love_ingre,
		hate_ingre: req.body.hate_ingre,
		comment: req.body.comment
	});

	order.save().then(function (doc) {
		sendmails.admin(order);

		res.status(200).json({ result: doc });
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findAllTheme = function (req, res, next) {
	Theme.find().exec().then(function (docs) {
		if (!docs) {
			res.status(404).json({ message: '등록된 테마가 없습니다.' });
		} else {
			res.status(200).json({ count: docs.length, result: docs });
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findByIdTheme = function (req, res, next) {
	Theme.findOne({ id: req.params.theme_id }).exec().then(function (doc) {
		if (!doc) {
			return res.status(404).json({ message: '해당 테마를 찾을 수 없습니다. (' + req.params.theme_id  + '번)'});
		}
		res.status(200).json({ result: doc });
	}).catch(function (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ message: '해당 테마를 찾을 수 없습니다. (' + req.params.theme_id  + '번)'});
		}
		return res.status(500).json({ error: err });
	});
};

exports.findAllIngredient = function (req, res, next) {
	Ingredient.find().exec().then(function (docs) {
		if (!docs) {
			res.status(404).json({ message: '등록된 원료가 없습니다.' });
		} else {
			res.status(200).json({ count: docs.length, result: docs });
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findByIdIngredient = function (req, res, next) {
	Ingredient.findOne({ id: req.params.ingredient_id }).exec().then(function (doc) {
		if (!doc) {
			return res.status(404).json({ message: '해당 원료를 찾을 수 없습니다. (' + req.params.ingredient_id  + '번)'});
		}
		res.status(200).json({ result: doc });
	}).catch(function (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ message: '해당 원료를 찾을 수 없습니다. (' + req.params.ingredient_id  + '번)'});
		}
		return res.status(500).json({ error: err });
	});
};
