const router = require('express').Router();
const {testController} = require('../controllers');
// const { route } = require('./authRouter');

router.post('/section',testController.getTotalSection);
router.post('/question',testController.questionSets);
router.post('/question_attemp',testController.getAttemptsQuestionAnswer);
router.post('/give_answer',testController.giveTheAnswer);
router.put('/finished',testController.finishedAnswer);
module.exports = router;