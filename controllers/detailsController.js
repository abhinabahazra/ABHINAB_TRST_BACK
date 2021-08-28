const {testModel} = require('../models');

module.exports.getUserDetails = async(req, res) =>{
    try{
        let {id} = req.body;
        id = parseInt(id);
        let getUser = await testModel.getUserDetails(id);
        if(getUser.rowCount){
            res.json({
                user_img  : getUser.rows[0].photo_sm,
                user_info :{
                    Name  : `${getUser.rows[0].first_name} ${getUser.rows[0].last_name}`,
                    Email : getUser.rows[0].email,
                    Phone : getUser.rows[0].phone
                }
            })
        }else{
            res.sendStatus(401);
        }
        
    }catch(error){
        console.log(error);
    }
}


module.exports.getExamDetails = async(req, res) =>{
    try{
        let {id} = req.body;
        id = parseInt(id);
        let getData = {};
        let getExam = await testModel.getExamDetails(id);
        if(getExam.rowCount){
            let numOfSection = await testModel.numberOfSection(id);
            getData = {
                Title   : getExam.rows[0].title,
                Time    : getExam.rows[0].time,
                Marks   : getExam.rows[0].marks,
                Program : getExam.rows[0].program,
                Code    : getExam.rows[0].code
            }


            getData.Section = numOfSection.rowCount;
            res.json(getData);
        }else{
            res.sendStatus(401);
        }
    }catch(error){
        console.log(error);
    }
}

module.exports.startExam = async(req, res) =>{
    try{
        let {id, time} = req.body;
        id = parseInt(id);
        let startExam = await testModel.startExam(id,time);
        if(startExam.rowCount){
            res.json(startExam.rowCount);
        }else{
            res.sendStatus(401);
        }
    }catch(error){
        console.log(error);
    }
}