const pool = require('../db');

/****************************************************
 *  USER AUTHENTICATION
 ****************************************************/
module.exports.passcodeVarification = (passcode) =>{
    return  pool.query("SELECT * FROM runtest_can WHERE pswd = $1 AND test_end_flag = false",[passcode]);
}

/*****************************************************
 *  USER AND EXAM DETAILS || EXAM START
 *****************************************************/

module.exports.getTestId = (id) =>{
    return  pool.query("SELECT * FROM test_pub WHERE id = $1",[id]);
}

module.exports.getUserDetails = (id) =>{
    return pool.query('SELECT first_name, last_name, email, phone, photo_sm FROM user_details WHERE id = $1',[id]);
}

module.exports.getExamDetails = (id) =>{
    return pool.query('SELECT test.title as title, test.duration as time, test.marks as marks, program.title as program, program.code as code FROM test INNER JOIN program ON program.id = test.cat_id WHERE test.id = $1',[id]);
}

module.exports.startExam = (id, time) => {
    return pool.query('UPDATE runtest_can SET test_start_flag = true, test_start_dttm = $2 WHERE id = $1',[id, time]);
}

module.exports.numberOfSection = (id) => {
    return pool.query('SELECT id, section_name FROM section WHERE test_id = $1 ORDER BY id',[id]);
}


module.exports.totalQuestionBySection = (id) =>{
    return pool.query('SELECT ques.id, ques.type_id, ques.qbody from questions as ques INNER JOIN section_question_map as sqm ON sqm.ques_id = ques.id WHERE sqm.section_id = $1',[id]);
}


module.exports.questionSets = (id, offset, maxLimit) => {
    return pool.query('SELECT ques.id, ques.type_id, ques.qbody, ques.marks from questions as ques INNER JOIN section_question_map as sqm ON sqm.ques_id = ques.id WHERE sqm.section_id = $1 ORDER BY ques.id OFFSET $2 LIMIT $3',[id,offset,maxLimit]);
}

module.exports.getOptionsByQuestion = (id) => {
    return pool.query('SELECT id, body FROM options WHERE ques_id = $1',[id])
}

module.exports.getAttemptsQuestionAnswer = (id, section, test_can, pub_id) => {
    return pool.query('SELECT rto.option_id FROM run_test_option as rto INNER JOIN run_test as rt ON rto.run_test_id = rt.id WHERE rt.ques_id = $1 AND rt.sec_id = $2 AND rt.test_pub_id = $4 AND rt.runtest_can_id = $3',[id, section ,test_can, pub_id]);
}

module.exports.checkAttemptsQuestion = (id, section, test_can, pub_id) => {
    return pool.query('SELECT * FROM run_test WHERE ques_id = $1 AND sec_id = $2 AND test_pub_id = $4 AND runtest_can_id = $3',[id, section, test_can, pub_id]);
}

module.exports.givenAnswerUpdate = (id, section, option, test_can, pub_id) => {
    return pool.query('UPDATE run_test_option SET option_id = $3 WHERE run_test_id = (SELECT id FROM run_test WHERE ques_id = $1 AND sec_id = $2 AND test_pub_id = $5 AND runtest_can_id = $4)',[id, section, option, test_can, pub_id]);
}

module.exports.insertIntoRunTest = (pub_id, sec_id, ques_id, test_can, ques_marks) => {
    return pool.query('INSERT INTO run_test (test_pub_id, sec_id, ques_id, runtest_can_id, marks) VALUES ($1, $2, $3, $4, $5) RETURNING id',[pub_id, sec_id, ques_id, test_can, ques_marks]);
}

module.exports.insertIntoRunTestOption = (run_test, option) => {
    return pool.query('INSERT INTO run_test_option (run_test_id, option_id, status, ans_status, marks) VALUES ($1, $2, false, false, 0) RETURNING *',[run_test, option]);
}

module.exports.finishedTest = (id, time) => {
    return pool.query('UPDATE runtest_can SET test_end_flag = true, test_end_dttm = $2 WHERE id = $1'[id, time]);
}