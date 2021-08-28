const pool = require('../db');

module.exports.passcodeAuthentication = async (req, res, next) => {
    try{
        let {passcode} = req.body
        let PasscodeData = await pool.query("SELECT * FROM runtest_can WHERE pswd = $1 AND test_start_flag = true",[passcode]);
        if(PasscodeData.rowCount){
            res.send(401);
        }else{
            next();
        }
    }catch(e){
        console.log(e.message);
    }
}