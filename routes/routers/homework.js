'use strict';

var express = require('express');
var router = express.Router();

var HomeworkController = require('../../controllers/homework-controller');
var homeworkController = new HomeworkController();
var githubReq = require('../../services/github-req.js');

router.get('/get-list', homeworkController.getList);
router.get('/quiz', homeworkController.getOneQuiz);
router.get('/get-branches', githubReq.getBranches);
router.put('/status/:historyId', homeworkController.updateStatus);
router.get('/estimated-time', homeworkController.getEstimatedTime);
router.post('/save', homeworkController.saveGithubUrl);

// router.get('/scoring', homeworkScoringController.getScoring);
router.get('/quizzes/:quizId', homeworkController.getQuiz);
router.put('/scoring/:historyId', homeworkController.updateScoring);
router.post('/scoring', homeworkController.createScoring);

module.exports = router;
