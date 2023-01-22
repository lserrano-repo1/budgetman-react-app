const oracledb = require('oracledb');
const {pool} = require('./../database/oracle');


/**
 * This method will create a new bank account
 * @param {*} param0 
 * @returns 
 */
module.exports.create = ({usrId, bnkId, curId, accNumber, accBalance}) =>{
    console.log("--- Account Model: Create ---");
    const inOutParams ={
        usrId,
        bnkId,
        curId,
        accNumber,
        accBalance,
        accId: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };

    console.info('Model inOutParams:');
    console.info(inOutParams);

    const sql_create_account = `INSERT INTO BUDGETMAN.ACCOUNT 
    (   USR_ID
        , BNK_ID
        , CUR_ID
        , ACC_NUMBER
        , ACC_BALANCE
    ) VALUES (:usrId,
        :bnkId,
        :curId,
        :accNumber,
        :accBalance
        )
    RETURNING ACC_ID into :accId `;
    
    console.log(sql_create_account);
    console.log(`inOutParams:`);
    console.log(inOutParams);
    return pool(sql_create_account, inOutParams, { autoCommit: true });
};


/**
 * This method will retrieve all bank accounts
 * without any filter
 * @returns 
 */
module.exports.getAll =()=>{
    console.log('--- Account Model: GET ALL  ---');
    const sql_getAll_accounts = ` SELECT ACC_ID "id", ACC_ID "accId"
    , (u.USR_SALUTATION||' '||u.USR_FIRST_NAME||' '||u.USR_LAST_NAME) "usrName"
    , b.BNK_NAME "bankName" 
    , c.CUR_ABBREVIATION "curName"
    , ACC_NUMBER "accNumber"
    , to_char(ACC_CREATION_DATE,'yyyy-MM-dd HH24:MM') "accCreationDate"
    , to_char(ACC_LAST_UPDATED,'yyyy-MM-dd HH24:MM') "accLastUpdate"
    , ROUND(ACC_BALANCE,2) "accBalance"  
    FROM BUDGETMAN.ACCOUNT a INNER JOIN BUDGETMAN.USERDATA u 
        ON a.USR_ID = u.USR_ID INNER JOIN BUDGETMAN.BANK b 
        ON a.BNK_ID =b.BNK_ID INNER JOIN BUDGETMAN.CURRENCY c 
        ON a.CUR_ID =c.CUR_ID  
    order by ACC_ID `;
    return pool(sql_getAll_accounts);
};


/**
 * This method will retrieve all accounts pertaining to a given ID
 * @param {*} param0 
 * @returns 
 */
module.exports.getById = ({accId}) =>{
    console.log('--- Account Model: GET BY ID ---');
    console.log(accId);

    const params = {
        accId,
    };
    console.log(params);
    const sql_geById_accounts = `SELECT ACC_ID "accId"
    , (u.USR_SALUTATION||' '||u.USR_FIRST_NAME||' '||u.USR_LAST_NAME) "usrName"
    , b.BNK_NAME "bankName" 
    , c.CUR_ABBREVIATION "curName"
    , ACC_NUMBER "accNumber"
    , ACC_CREATION_DATE "accCreationDate"
    , ACC_LAST_UPDATED "accLastUpdate"
    , round(ACC_BALANCE,2) "accBalance"  
    FROM BUDGETMAN.ACCOUNT a INNER JOIN BUDGETMAN.USERDATA u 
        ON a.USR_ID = u.USR_ID INNER JOIN BUDGETMAN.BANK b 
        ON a.BNK_ID =b.BNK_ID INNER JOIN BUDGETMAN.CURRENCY c 
        ON a.CUR_ID =c.CUR_ID  
    WHERE ACC_ID = :accId `;

    return pool(sql_geById_accounts, params);
};


/**
 * This method will locate an account number containing any of the given numbers
 * @param {*} param0 
 * @returns 
 */
module.exports.getByAccNumberLike = ({ accNumber }) => {
    console.log('--- Account Model: Search account number like ---');
    console.log(accNumber);
    const params = {
        accNumber,
    };
    const sql_getByAccNumberLike = `SELECT ACC_ID "accId"
    , (u.USR_SALUTATION||' '||u.USR_FIRST_NAME||' '||u.USR_LAST_NAME) "usrName"
    , b.BNK_NAME "bankName" 
    , c.CUR_ABBREVIATION "curName"
    , ACC_NUMBER "accNumber"
    , ACC_CREATION_DATE "accCreationDate"
    , ACC_LAST_UPDATED "accLastUpdate"
    , round(ACC_BALANCE,2) "accBalance"  
    FROM BUDGETMAN.ACCOUNT a INNER JOIN BUDGETMAN.USERDATA u 
        ON a.USR_ID = u.USR_ID INNER JOIN BUDGETMAN.BANK b 
        ON a.BNK_ID =b.BNK_ID INNER JOIN BUDGETMAN.CURRENCY c 
        ON a.CUR_ID =c.CUR_ID  
    WHERE ACC_NUMBER LIKE '%:accNumber%' `;

    return pool(sql_getByAccNumberLike, params);
};


/**
 * This method will locate an exact account number
 * @param {*} param0 
 * @returns 
 */
module.exports.getByAccNumberExact = ({ accNumber }) => {
    console.log('--- Account Model: Search account number exact ---');
    console.log(accNumber);
    const params = {
        accNumber,
    };
    const sql_getByAccNumberExact = `SELECT ACC_ID "accId"
    , (u.USR_SALUTATION||' '||u.USR_FIRST_NAME||' '||u.USR_LAST_NAME) "usrName"
    , b.BNK_NAME "bankName" 
    , c.CUR_ABBREVIATION "curName"
    , ACC_NUMBER "accNumber"
    , ACC_CREATION_DATE "accCreationDate"
    , ACC_LAST_UPDATED "accLastUpdate"
    , round(ACC_BALANCE,2) "accBalance"  
    FROM BUDGETMAN.ACCOUNT a INNER JOIN BUDGETMAN.USERDATA u 
        ON a.USR_ID = u.USR_ID INNER JOIN BUDGETMAN.BANK b 
        ON a.BNK_ID =b.BNK_ID INNER JOIN BUDGETMAN.CURRENCY c 
        ON a.CUR_ID =c.CUR_ID  
    WHERE ACC_NUMBER = :accNumber `;

    return pool(sql_getByAccNumberExact, params);
};

/**
 * This method will update account balance
 * @param {*} param0 
 * @returns 
 */
module.exports.updateAccountBalance = ({accId, accBalance})=>{
    console.log('--- Account Model: Update account balance ---');
    console.log(accId);
    console.log(accBalance);
    const inOutParams = {
        accId: {val: bankId,type: oracledb.NUMBER, dir: oracledb.BIND_INOUT,},
        accBalance ,
    };
    console.info('Model inOutParams:');
    console.info(inOutParams);

    const sql_update_accountBalance = `UPDATE BUDGETMAN.ACCOUNT
        set ACC_BALANCE = :accBalance
        where ACC_ID = :accId  
        RETURNING ACC_ID into :accId
        `;
    console.log(sql_update_accountBalance);
    return pool(sql_update_accountBalance, inOutParams, { autoCommit: true });
};


/**
 * This method will update account balance
 * @param {*} param0 
 * @returns 
 */
module.exports.updateAccount = ({accId, usrId, curId, accNumber, accBalance})=>{
    console.log('--- Account Model: Update account ---');
    console.log("{accId, usrId, curId, accNumber, accBalance}");
    console.log(accId);
    console.log(usrId);
    console.log(curId);
    console.log(accNumber);
    console.log(accBalance);

    const inOutParams = {
        accId: {val: bankId,type: oracledb.NUMBER, dir: oracledb.BIND_INOUT,},
        usrId ,
        curId , 
        accNumber ,
        accBalance, 
    };
    console.info('Model inOutParams:');
    console.info(inOutParams);

    const sql_update_account = `UPDATE BUDGETMAN.ACCOUNT
        set USR_ID = :usrId
        , CUR_ID = :curId
        , ACC_NUMBER = :accNumber
        , ACC_BALANCE =  :accBalance
        , ACC_LAST_UPDATED = sysdate
        where ACC_ID = :accId  
        RETURNING ACC_ID into :accId
        `;
    console.log(sql_update_account);
    return pool(sql_update_account, inOutParams, { autoCommit: true });
};


/**
 * This method will delete account id ONLY if it has zero balance
 * @param {*} param0 
 * @returns 
 */
module.exports.deleteById = ({accId}) => {
    console.log('--- Account Model: Delete By id ---');
    console.log("{accId}");
    console.log(accId);

    const inOutParams = {
        accId,
    };
    console.log('inOutParams:');
    console.log(inOutParams);

    const sql_account_delete = `DELETE FROM BUDGETMAN.ACCOUNT 
        where ACC_ID=:accId 
            and ACC_BALANCE = 0`;

    return pool(sql_account_delete, inOutParams, { autoCommit: true });
}


/**
 * Get currency for a given account number
 * @param {*} param0 
 * @returns 
 */
module.exports.findAccountCurrency = ({accNumber})=>{
    console.log('--- Account Model: Find account currency ---');
    console.log("{accNumber}");
    console.log(accNumber);

    const inOutParams = {
        accNumber,
    };
    console.log('inOutParams:');
    console.log(inOutParams);

    const sql_account_currency = `SELECT 
     a.ACC_NUMBER "accNumber"
        , c.CUR_NAME "curName" 
        , c.CUR_ID  "curId" 
    FROM BUDGETMAN.ACCOUNT a 
        INNER JOIN BUDGETMAN.CURRENCY c ON a.CUR_ID = c.CUR_ID
    WHERE a.ACC_NUMBER  = :accNumber`;

    return pool(sql_account_currency, inOutParams, { autoCommit: true });
}
