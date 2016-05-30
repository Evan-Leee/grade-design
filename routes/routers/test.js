'use strict';

var express = require('express');
var router = express.Router();

var TestController = require('../../controllers/test-controller');
var testController = new TestController();

router.get('/detail', testController.isDetailed);
router.get('/isPaperCommitted', testController.isPaperCommitted);

module.exports = router;
