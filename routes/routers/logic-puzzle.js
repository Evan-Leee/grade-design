'use strict';

var express = require('express');
var router = express.Router();

var LogicPuzzleController = require('../../controllers/logic-puzzle-controller');
var logicPuzzleController = new LogicPuzzleController();

router.get('/', logicPuzzleController.getLogicPuzzle);

router.post('/', logicPuzzleController.submitPaper);

router.post('/save', logicPuzzleController.saveAnswer);

module.exports = router;
