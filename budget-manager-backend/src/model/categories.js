const {pool} = require('./../database/oracle');

/**
 * Get all categories
 * @returns 
 */
const getAll = ()=>{
    const sql_getAll_categories = `SELECT CAT_ID, CAT_NAME FROM BUDGETMAN.CATEGORIES`;
    return pool(sql_getAll_categories);
}

/**
 * Get category name given its ID
 * @param {*} param0 
 * @returns 
 */
const getById =({catId})=>{
    const params = {
        catId
    }
    const sql_getById_categories = `SELECT CAT_NAME FROM BUDGETMAN.CATEGORIES WHERE CAT_ID = :catId`;

    return pool(sql_getById_categories, params);
}


module.exports ={ 
    getAll
    , getById
};