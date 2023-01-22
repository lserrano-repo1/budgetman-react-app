const bcrypt = require('bcryptjs');
const oracledb = require('oracledb');
const {pool} = require('./../database/oracle');


/**
 * This function will create a new user 
 * @param {email,password,firstName, lastName} param0 
 * @returns 
 */
module.exports.create = ({email,password,salutation,firstName, lastName}) =>{
    console.log('--- User Model : Create ---');
    const inOutParams ={
        email
        , password: bcrypt.hashSync(password,8)
        , salutation
        , firstName
        , lastName
        , usr_token:{type:oracledb.STRING, dir:oracledb.BIND_OUT}
    };

    console.log('create inOutParams');
    console.log(inOutParams);
    
    const sql_create_user = ` insert into BUDGETMAN.USERDATA
        (   USR_EMAIL
            , USR_PASSWORD
            , USR_SALUTATION
            , USR_FIRST_NAME
            , USR_LAST_NAME
            , USR_TOKEN
        )
        values (:email
            , :password
            , :salutation
            , :firstName
            , :lastName
            , BUDGETMAN.TOKEN_GENERATOR(TO_CHAR(SYSDATE,'DD-MM-YYYY HH24:MI:SS') || :password) 
        )
        RETURNING USR_TOKEN into :usr_token
    `;
    console.log(sql_create_user);
    return pool(sql_create_user,inOutParams,{autoCommit:true});

};


/**
 * This function will get crypted password given a user email
 * @param {*} param0 
 * @returns 
 */
module.exports.hashPassword = ({email}) => {
    const inputParams = { 
        email,
     };
  
    const sql_get_hashed_password = `select USR_PASSWORD 
        from BUDGETMAN.USERDATA 
        where USR_EMAIL = :email`;

        return pool(sql_get_hashed_password, inputParams);
    
     
}



/**
 * This function will handle User login process
 * @param {*} param0 
 * @returns 
 */
module.exports.login = ({email, password}) =>{
    console.log('--- User Model : Login ---');
    const inOutParams = { 
        email,
        password: bcrypt.hashSync(password,8),
        usr_token: {type:oracledb.STRING, dir:oracledb.BIND_OUT}
    }

    console.log('inOutParams');
    console.log(inOutParams);

    const sql_login = `update BUDGETMAN.USERDATA 
        set USR_LAST_MODIFIED = sysdate,
            USR_TOKEN = BUDGETMAN.TOKEN_GENERATOR(TO_CHAR(SYSDATE,'DD-MM-YYYY HH24:MI:SS') || :password)
        where USR_EMAIL = :email
        RETURNING USR_TOKEN into :usr_token`;

    console.log('sql_login');
    console.log(sql_login);

    return pool(sql_login,inOutParams,{autoCommit:true});
};


