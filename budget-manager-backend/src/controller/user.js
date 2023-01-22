const bcrypt = require('bcryptjs');
const User = require('../model/user');


/**
 * This function will handle user login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.userLogin = async(req,res,next)=>{

    console.log('--- User Controller : Login ---');

    //check cookies
    console.log('Cookies:');
    console.log(req.cookies);

    const inputParams = {
        email:req.body.email
        , password: req.body.password
    };
    console.log("inputParams:");
    console.log(inputParams);

    try{
        const {rows:hashedPassword} = await User.hashPassword(inputParams);
        

        if(hashedPassword.length>0){
            
            console.log(`{Hashed stored password, inputParams.password, bcrypt.compareSync}`);
            console.log(hashedPassword[0]['USR_PASSWORD']);
            console.log(req.body.password);
            console.log( bcrypt.compareSync(req.body.password, hashedPassword[0].USR_PASSWORD));

            if( bcrypt.compareSync(req.body.password, hashedPassword[0].USR_PASSWORD)  ){
                const {outBinds} = await User.login(inputParams);
                
                console.log(`userLogin outParam`);
                console.log(outBinds);

                const {usr_token} = outBinds;

                return res.status(200).cookie('usr_auth_token', usr_token[0]).json({
                    message: "User login is correct.",
                    email: inputParams.email,
                    token: usr_token[0],
                });

                
            }
        }


        return res.status(200).json({
            message: "Login data is not valid",
            email: "",
            token: "",
        });

    } catch(error){
        return res.status(400).clearCookie('usr_auth_token').json({
            error:error
        });
    }
};



/**
 * Create new user method
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.registerNewUser = async(req,res,next)=>{
    console.log('--- User Controller: Create ---');
    
    const inputParams = {
          email: req.body.email
        , password: req.body.password
        , salutation: req.body.salutation
        , firstName: req.body.firstName
        , lastName: req.body.lastName
    };

    console.log('----> Parameters used to create a new user:');
    console.log(inputParams);

    try{
        const {outBinds} = await User.create(inputParams);
        const {usr_token} = outBinds;

        console.log(`Create user output:`);
        console.log(outBinds);
        
        res.status(200).cookie('usr_auth_token', usr_token[0]).json({
            message:'New user has been created',
            email: inputParams.email,
            usr_token: usr_token[0],
        });
    } catch(error){
        res.status(400).clearCookie('usr_auth_token').json({error:error});
    }
}


