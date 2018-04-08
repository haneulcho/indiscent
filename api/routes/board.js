var boards = require('../controllers/board.controller');
var express = require('express');
var router = express.Router();

router.get('/', boards.findAll);
router.get('/:board_id', boards.findById);

router.post('/', boards.create);
router.put('/:board_id', boards.update);

router.delete('/:board_id', boards.delete);

module.exports = router;
