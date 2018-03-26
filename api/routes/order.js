var orders = require('../controllers/order.controller');
var express = require('express');
var router = express.Router();

router.get('/', orders.findAll);
router.get('/:order_id', orders.findById);

router.post('/', orders.create);
router.put('/:order_id', orders.update);

router.delete('/:order_id', orders.delete);

module.exports = router;
