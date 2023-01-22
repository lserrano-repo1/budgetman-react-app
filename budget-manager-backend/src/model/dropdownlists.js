const {pool} = require('./../database/oracle');


const ddlSqlUsers = `SELECT USR_ID "value", (USR_SALUTATION || ' ' || USR_FIRST_NAME || ' ' || USR_LAST_NAME) "label" FROM BUDGETMAN.USERDATA`;
const ddlSqlBanks = `SELECT BNK_ID "value", BNK_NAME "label" FROM BUDGETMAN.BANK`;
const ddlSqlCurrency = `SELECT CUR_ID "value", CUR_NAME "label" FROM BUDGETMAN.CURRENCY`;
const ddlSqlCategories = `SELECT CAT_ID "value", CAT_NAME "label" FROM BUDGETMAN.CATEGORIES UNION ALL SELECT null "value", 'Account Transference' "label" FROM dual`;
const ddlSqlTranType = `SELECT TYP_ID "value", TYP_NAME "label"  FROM TRANTYPE t `;
const ddlSqlAccounts = `SELECT ACC_ID "value", (a.ACC_NUMBER || ' - ' || b.BNK_NAME ) "label" FROM BUDGETMAN.ACCOUNT a INNER JOIN BUDGETMAN.BANK b ON a.BNK_ID =b.BNK_ID`;
const ddlSqlCurrencyByAccountId =` SELECT c.CUR_ID "value", c.CUR_NAME "label" 
                                    FROM BUDGETMAN.CURRENCY c INNER JOIN BUDGETMAN.ACCOUNT a 
                                        ON c.CUR_ID=a.CUR_ID WHERE a.ACC_ID = :accId `

/**
 * User's list
 * @returns 
 */
module.exports.ddlUsers = () =>{
    return pool(ddlSqlUsers);
};

/**
 * Bank's list
 * @returns 
 */
module.exports.ddlBanks =()=>{
    return pool(ddlSqlBanks);
};

/**
 * Currencies list
 * @returns 
 */
module.exports.ddlCurrency =()=>{
    return pool(ddlSqlCurrency);
};

/**
 * Categories list
 * @returns 
 */
module.exports.ddlCategories =()=>{
    return pool(ddlSqlCategories);
};


/** Transactions types */
module .exports.ddlTranType = ()=>{
    return pool(ddlSqlTranType);
}

/** All registered accounts and its associated banks */
module.exports.ddlAccounts =()=>{
    return pool(ddlSqlAccounts);
}


/**
 * This will get the correspondig currency given an account ID
 * @param {accId} param0 
 * @returns 
 */
module.exports.ddlCurrencyByAccountId =({accId})=>{
    console.log('--- DDL Currency by account id ---');
    console.log(accId);

    const params = {
        accId,
    };
    console.log(params);

    return pool(ddlSqlCurrencyByAccountId, params);
}