const router = require('express').Router();
const {authController} = require('../controllers');

router.post('/',authController.passcodeAuthentication);
// router.post('/user_details',testController.getUserDetails);
// router.post('/exam_details',testController.getExamDetails);
// router.post('/sections',testController.getTotalSection);
// router.post('/question',testController.questionSets)

module.exports = router;