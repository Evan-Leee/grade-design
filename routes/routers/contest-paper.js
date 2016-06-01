'use strict';

var express = require('express');
var router = express.Router();
var ContestPaper = require('../../controllers/contest-paper-controller');
var contestPaper = new ContestPaper();

router.get('/', contestPaper.initPaperList);

module.exports = router;
