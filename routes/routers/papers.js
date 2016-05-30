'use strict';

var express = require('express');
var router = express.Router();
var PaperController = require('../../controllers/paper-controller');

router.get('/:paperHash', PaperController.details);
router.get('/:paperId/obtainment', PaperController.obtain);
module.exports = router;
