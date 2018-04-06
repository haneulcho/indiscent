var items = require('../controllers/item.controller');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.json({ message: 'Welcome to Indiscent Beta API!' });
});

router.get('/theme', items.theme.findAll);
router.get('/theme/:theme_id', items.theme.findById);

router.get('/ingredient', items.ingredient.findAll);
router.get('/ingredient/:ingredient_id', items.ingredient.findById);

module.exports = router;
