var Board = require('../models/board');

exports.create = function (req, res, next) {
	var board = new Board({
		subject: req.body.subject,
		name: req.body.name,
		email: req.body.email,
		contents: req.body.contents
	});

	board.save().then(function (doc) {
		res.status(200).json({ result: doc });
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findAll = function (req, res, next) {
	Board.find().exec().then(function (docs) {
		if (!docs) {
			res.status(404).json({ message: '등록된 게시글이 없습니다.' });
		} else {
			res.status(200).json({ count: docs.length, result: docs });
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findById = function (req, res, next) {
	Board.findOne({ id: req.params.board_id }).exec().then(function (doc) {
		if (!doc) {
			res.status(404).json({ message: '해당 게시글을 찾을 수 없습니다.' });
		} else {
			res.status(200).json({ result: doc });
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.update = function (req, res, next) {
	req.body.edited_at = Date.now();

	Board.update({ id: req.params.board_id }, { $set: req.body }).exec().then(function (doc) {
		if (!doc) {
			res.status(404).json({ message: '해당 게시글을 찾을 수 없습니다.' });
		} else {
			res.status(200).json({ result: doc });
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.delete = function (req, res, next) {
	Board.remove({ id: req.params.board_id }).exec().then(function (doc) {
		if (!doc) {
			res.status(404).json({ message: '해당 게시글을 찾을 수 없습니다.' });
		} else {
			res.status(200).json({ result: doc });
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};
