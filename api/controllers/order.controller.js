var Order = require('../models/order');

exports.create = function (req, res, next) {
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
		res.status(200).json({ result: doc });
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findAll = function (req, res, next) {
	Order.find().exec().then(function (docs) {
		if (!docs) {
			res.status(404).json({ message: '등록된 주문이 없습니다.' });
		} else {
			res.status(200).json({ count: docs.length, result: docs });
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findById = function (req, res, next) {
	Order.findOne({ id: req.params.order_id }).exec().then(function (doc) {
		if (!doc) {
			res.status(404).json({ message: '해당 주문을 찾을 수 없습니다.' });
		} else {
			res.status(200).json({ result: doc });
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.update = function (req, res, next) {
	req.body.edited_at = Date.now();
	
	Order.update({ id: req.params.order_id }, { $set: req.body }).exec().then(function (doc) {
		if (!doc) {
			res.status(404).json({ message: '해당 주문을 찾을 수 없습니다.' });
		} else {
			res.status(200).json({ result: doc });
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.delete = function (req, res, next) {
	Order.remove({ id: req.params.order_id }).exec().then(function (doc) {
		if (!doc) {
			res.status(404).json({ message: '해당 주문을 찾을 수 없습니다.' });
		} else {
			res.status(200).json({ result: doc });
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};
