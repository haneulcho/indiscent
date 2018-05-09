var applications = require('../controllers/application.controller');
var express = require('express');
var router = express.Router();

router.get('/theme', applications.findAllTheme);
router.get('/theme/:theme_id', applications.findByIdTheme);
router.get('/ingredient', applications.findAllIngredient);
router.get('/ingredient/:ingredient_id', applications.findByIdIngredient);
router.get('/complete', applications.complete);

module.exports = router;
