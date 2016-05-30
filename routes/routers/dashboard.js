'use strict';

var express = require('express');
var router = express.Router();
var DashboardController = require('../../controllers/dashboard-controller');
var dashboardController = new DashboardController();

router.get('/', dashboardController.isCommited);

module.exports = router;
