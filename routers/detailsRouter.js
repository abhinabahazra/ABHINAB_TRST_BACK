const router = require('express').Router();
const {detailsController} = require('../controllers');

router.post('/user_details',detailsController.getUserDetails);
router.post('/exam_details',detailsController.getExamDetails);
router.put('/start_exam',detailsController.startExam)

module.exports = router;