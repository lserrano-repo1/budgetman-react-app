const oracledb = require('oracledb');
const {pool} = require('./../database/oracle');




module.exports.getAccountBalance =()=>{


    const sql_account_balance = ` SELECT  DISTINCT t.ACC_ID, a.ACC_NUMBER
        ,  t.CUR_ID, c.CUR_NAME, t2.TYP_NAME
        , sum(t.TRN_AMOUNT) OVER (PARTITION BY t.ACC_ID, t.TYP_ID) "availableAmount"
    FROM BUDGETMAN."TRANSACTION" t INNER JOIN BUDGETMAN.CURRENCY c 
        ON t.CUR_ID = c.CUR_ID INNER JOIN BUDGETMAN.ACCOUNT a 
        ON t.ACC_ID = a.ACC_ID INNER JOIN TRANTYPE t2 
        ON t.TYP_ID =t2.TYP_ID 
    WHERE  t.TYP_ID =2 and  a.ACC_NUMBER ='120000598001'
    `;

}