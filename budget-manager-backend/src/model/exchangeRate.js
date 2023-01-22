
const {pool} = require('./../database/oracle');


const exc_rate_sql = `SELECT e.EXC_ID "excId", e.CUR_ID "curId", e.EXC_VALUE "excValue", e.EXC_CURRENCY_REF "curRef", max(e.EXC_LAST_UPDATE) "lastUpdate" 
                FROM BUDGETMAN.EXCHGRATE e 
                WHERE e.CUR_ID= :curId
                GROUP BY e.EXC_ID , e.CUR_ID , e.EXC_VALUE, e.EXC_CURRENCY_REF  `;

/**
 * This will get the exchange rate for a given currency ID
 * @param {accId} param0 
 * @returns 
 */
module.exports.getExchangeRateForGivenCurrency =({curId})=>{
    console.log('--- Get exchange rate given currency id ---');
    console.log(curId);

    const params = {
        curId,
    };
    console.log(params);

    return pool(exc_rate_sql, params);
}