const {testModel} = require('../models');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'MAGNOX';

module.exports.passcodeAuthentication = async(req, res) => {
    try{
        let {passcode} = req.body;
        let passcodeData = await testModel.passcodeVarification(passcode);
        let testId       = '';
        if(passcodeData.rowCount){
            try{
                testId = await testModel.getTestId(passcodeData.rows[0].test_pub_id);
                if(testId.rowCount){
                    let user = {
                        userID : passcodeData.rows[0].can_id,
                        testID : testId.rows[0].test_id
                    }
                    const token = jwt.sign({
                        data: user}, 'MAGNOX'
                    )
                    res.json({
                        token   : token,
                        test_can : passcodeData.rows[0].id,
                        user_id : passcodeData.rows[0].can_id,
                        test_id : testId.rows[0].test_id,
                        pub_id  : passcodeData.rows[0].test_pub_id
                    });
                }else{
                    res.sendStatus(403);
                }

            }catch(error){
                console.log(error);
            }
        }else{
            res.sendStatus(403);
        }

    }catch(error){
        console.log(error);
    }
}




