var Order = require('../models/order');
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