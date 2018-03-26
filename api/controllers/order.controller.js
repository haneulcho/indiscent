var Order = require('../models/order');
var express = require('express');
var router = express.Router();

module.exports = {
	create: function (req, res) {
		var order = new Order();

		order = {
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
		};

		order.save(function (err) {
			if (err) {
				res.json({ code: 0, errors: err });
			} else {
				res.json({ code: 1, message: 'Order created!' });
			}
		});
	},

	findAll: function (req, res) {
		Order.find(function (err, result) {
			if (err) {
				res.json({ code: 0, errors: err });
			} else {
				res.json({ code: 1, result: result });
			}
		});
	},

	findById: function (req, res) {
		Order.findOne({ id: req.params.order_id }, function (err, result) {
			if (err) {
				res.json({ code: 0, errors: err });
			} else {
				res.json({ code: 1, result: result });
			}
		});
	},

	update: function (req, res) {
		delete req.body._id;

		Order.update({ id: req.params.order_id }, req.body, function (err) {
			if (err) {
				res.json({ code: 0, errors: err });
			} else {
				res.json({ code: 1 });
			}
		});
	},

	delete: function (req, res) {
		Order.remove({ id: req.params.order_id }, function (err) {
			if (err) {
				res.json({ code: 0, errors: err });
			} else {
				res.json({ code: 1 });
			}
		});
	}
};
