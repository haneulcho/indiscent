var applications = require('../controllers/application.controller');
var express = require('express');
var router = express.Router();

router.post('/complete', applications.complete);

module.exports = router;
