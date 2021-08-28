const {testModel} = require('../models');


module.exports.getTotalSection = async(req, res) => {
    try{
        let {id} = req.body;
        id = parseInt(id);
        let getSection = await testModel.numberOfSection(id);
        if(getSection.rowCount){
            res.json(getSection.rows);
        }else{
            res.sendStatus(401);
        }
    }catch(error){
        console.log(error);
    }
}

module.exports.questionSets = async(req, res) => {
    try{
        let {id, page, maxLimit} = req.body;
        id             = parseInt(id);
        page           = parseInt(page);
        maxLimit       = parseInt(maxLimit) || 1;
        let offset     = (page - 1) * maxLimit;

        let totalQuesBySec = await testModel.totalQuestionBySection(id);
        if(totalQuesBySec.rowCount){
            let getQuesSet = await testModel.questionSets(id, offset, maxLimit);
            if(getQuesSet.rowCount){
                let getOptions = await testModel.getOptionsByQuestion(getQuesSet.rows[0].id);
                if(getOptions.rowCount){
                    res.json({
                        totalRecords : totalQuesBySec.rowCount,
                        question     : getQuesSet.rows[0],
                        options      : getOptions.rows
                    });
                }else{
                    res.sendStatus(401);
                }
            }else{
                res.sendStatus(401);
            }
        }else{
            res.sendStatus(401);
        }
    }catch(error){
        console.log(error);
    }
}

module.exports.getAttemptsQuestionAnswer = async(req, res) => {
    try{
        let {id, section, test_can, pub_id} = req.body;
        id                = parseInt(id);
        section           = parseInt(section);  
        test_can          = parseInt(test_can);
        pub_id            = parseInt(pub_id);

        let isAttem   = await testModel.checkAttemptsQuestion(id, section, test_can, pub_id);
        if(isAttem.rowCount){
            let getOption = await testModel.getAttemptsQuestionAnswer(id, section, test_can, pub_id);
            res.json(getOption.rows[0]);
        }else{
            res.sendStatus(401);
        }
    }catch(error){
        console.log(error);
    }
}

module.exports.giveTheAnswer = async (req, res) => {
    try{
        let {test_can, pub_id, sec_id, ques_id, option_id, ques_marks} = req.body;
        test_can    = parseInt(test_can);
        pub_id      = parseInt(pub_id);
        sec_id      = parseInt(sec_id);
        ques_id     = parseInt(ques_id);
        option_id   = parseInt(option_id);
        ques_marks  = parseFloat(ques_marks);


        let isAttem   = await testModel.checkAttemptsQuestion(ques_id, sec_id, sec_id , test_can, pub_id);

        if(isAttem.rowCount){
            let updateAnswer = await testModel.givenAnswerUpdate(ques_id, sec_id, option_id, test_can, pub_id);
            res.json(updateAnswer.rows[0]);
        }else{
            let runTest = await testModel.insertIntoRunTest(pub_id, sec_id, ques_id, test_can, ques_marks);
            if(runTest.rowCount){
                let runTestOption = await testModel.insertIntoRunTestOption(runTest.rows[0].id, option_id);
                res.json(runTestOption.rows[0]);
            }else{
                res.sendStatus(401);
            }
        }
    }catch(error){
        console.log(error);
    }
}


module.exports.finishedAnswer = async (req, res) => {
    try{
        let {id, time} = req.body;
        id = parseInt(id);
        let finished = await testModel.finishedTest(id, time);
        res.json(finished)
    }catch(error){
        res.sendStatus(401);
    }
}