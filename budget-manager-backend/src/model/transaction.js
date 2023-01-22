const oracledb = require('oracledb');
const {pool} = require('./../database/oracle');


/**
 * this function will handle a new transaction creation
 * @param {*} param0 
 * @returns 
 */
module.exports.create =({curId, accId, catId, typId, trnAmount, trnDescription})=>{
    console.log('--- Transaction Model: Create ---');
    
    const inOutParams = {
      curId,
      accId,
      catId,
      typId,
      trnAmount,
      trnDescription,
      trnId : { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };

    console.info('Model inOutParams:');
    console.info(inOutParams);

    const sql_create_transaction = `INSERT INTO BUDGETMAN."TRANSACTION" 
    (
        CUR_ID
        , ACC_ID
        , CAT_ID
        , TYP_ID
        , TRN_AMOUNT
        , TRN_DESCRIPTION
        , TRN_CREATION_DATE
    ) 
    VALUES (
        :curId
        ,:accId
        ,:catId
        ,:typId
        ,:trnAmount
        ,:trnDescription
        , sysdate
    )
    RETURNING TRN_ID into :trnId
    `;

    console.log(sql_create_transaction);
    console.log(`inOutParams:`);
    console.log(inOutParams);
    return pool(sql_create_transaction, inOutParams, { autoCommit: true });
};


/**
 * this function will get all transactions with no filter
 * @returns 
 */
module.exports.getAll = () => {
    console.log('--- Transaction Model: Create ---');
    const sql_getAll_transactions = `SELECT TRN_ID "trnId"
    , c.CUR_NAME "curName"
    , a.ACC_NUMBER "accNumber"
    , b.BNK_NAME "bankName"
    , c2.CAT_NAME "catName"
    , t2.TYP_NAME "tranType"
    , t.TRN_AMOUNT 
    , t.TRN_DESCRIPTION 
    , t.TRN_CREATION_DATE 
    FROM BUDGETMAN."TRANSACTION" t INNER JOIN BUDGETMAN.CURRENCY c
    ON t.CUR_ID = c.CUR_ID INNER JOIN BUDGETMAN.ACCOUNT a 
    ON t.ACC_ID = a.ACC_ID INNER JOIN BUDGETMAN.BANK b 
    ON a.BNK_ID =b.BNK_ID INNER JOIN BUDGETMAN.CATEGORIES c2 
    ON t.CAT_ID = c2.CAT_ID INNER JOIN BUDGETMAN.TRANTYPE t2 
    ON t.TYP_ID = t2.TYP_ID  `;
    return pool(sql_getAll_transactions);
};


/**
 * This will get a transaction given an specific ID
 * @param {*} param0 
 * @returns 
 */
module.exports.getById = ({ trnId }) => {
    console.log('--- Transaction Model: GET BY ID ---');
    console.log(trnId);

    const params = {
        trnId,
    };
    console.log(params);
    const sql_getTransaction_ById = `SELECT TRN_ID "trnId"
    , CUR_ID "curId"
    , ACC_ID "accId"
    , CAT_ID "catId"
    , TYP_ID "typId"
    , TRN_AMOUNT "trnAmount"
    , TRN_DESCRIPTION "trnDescription"
    , TRN_CREATION_DATE "trnCreationDate"
    FROM BUDGETMAN."TRANSACTION" t
    WHERE TRN_ID = :trnId `;

    return pool(sql_getTransaction_ById, params);
};


module.exports.tranFiltered = (inParams)=>{
    console.log('--- Transaction Model: Filter by data, category or account ---');
    console.log("params: {trnCreationDate, catId, accId}");
    console.log(inParams);

    const sqlParts = buildWhereClause(inParams);
    console.log("sqlParts {where, values}");
    console.log(sqlParts.where);
    console.log(sqlParts.values);

    const sql_filtered_transactions = ` SELECT TRN_ID "trnId"
    , c.CUR_NAME "curName"
    , a.ACC_NUMBER "accNumber"
    , b.BNK_NAME "bankName"
    , c2.CAT_NAME "catName"
    , t2.TYP_NAME "tranType"
    , t.TRN_AMOUNT "tranAmount" 
    , t.TRN_DESCRIPTION  "tranDescription"
    , to_char(t.TRN_CREATION_DATE,'yyyy-MM-dd HH24:MM')  "tranDate" 
    FROM BUDGETMAN."TRANSACTION" t INNER JOIN BUDGETMAN.CURRENCY c
        ON t.CUR_ID = c.CUR_ID INNER JOIN BUDGETMAN.ACCOUNT a 
        ON t.ACC_ID = a.ACC_ID INNER JOIN BUDGETMAN.BANK b 
        ON a.BNK_ID =b.BNK_ID LEFT JOIN BUDGETMAN.CATEGORIES c2 
        ON t.CAT_ID = c2.CAT_ID INNER JOIN BUDGETMAN.TRANTYPE t2 
        ON t.TYP_ID = t2.TYP_ID
    WHERE ` + sqlParts.where + ` order by TRN_ID DESC`;

    console.log("sql_filtered_transactions");
    console.log(sql_filtered_transactions);

    return pool(sql_filtered_transactions, sqlParts.values);
}


/** Helper function to assemble filters */
function buildWhereClause(inParams){
    const conditions = new Array();
    let values = new Array();
    
    if(typeof inParams.trnCreationDate !== 'undefined' 
        &&  inParams.trnCreationDate !== null 
        && inParams.trnCreationDate !== '')
    {
        console.info("Data param provided");
        conditions.push(` trunc(t.TRN_CREATION_DATE) = to_date( :trnCreationDate ,'yyyy-MM-dd') `);
        values.push(inParams.trnCreationDate);
    };

    if(typeof inParams.catId !== 'undefined'  
         && inParams.catId!==null 
        && inParams.catId!=='')
    {
        conditions.push(` t.CAT_ID = :catId `);
        values.push(parseInt(inParams.catId));
    } else if (inParams.catId===null ){
        conditions.push(` t.CAT_ID is null `); /** This is necessary to display TRANSFERENCES */
    }

    if(typeof inParams.accId !== 'undefined'  
        && inParams.accId!==null 
        && inParams.accId!=='')
    {
        conditions.push(` t.ACC_ID = :accId `);
        values.push(parseInt(inParams.accId));
    }

    /** If not a single param is provided it will return all dataset */
    return {
        where: conditions.length > 0 ? conditions.join(' AND ') : '1=1'
        , values: values
    }

}



