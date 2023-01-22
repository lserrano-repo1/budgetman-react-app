const oracledb = require('oracledb');
const { pool } = require('./../database/oracle');

/**
 * This function will handle new bank creation
 */
module.exports.create = ({ bankName, bankAddress, bankContact, bankEmail }) => {
    console.log('--- Bank Model: Create ---');
    const inOutParams = {
        bankName,
        bankAddress,
        bankContact,
        bankEmail,
        bankId: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };

    console.info('Model inOutParams:');
    console.info(inOutParams);

    const sql_create_bank = `insert into BUDGETMAN.BANK
        (BNK_NAME
            , BNK_ADDRESS
            , BNK_CONTACT
            , BNK_CONTACT_EMAIL
            ) 
            values (:bankName
                , :bankAddress
                , :bankContact
                , :bankEmail )
        RETURNING BNK_ID into :bankId
        `;

    console.log(sql_create_bank);
    console.log(`inOutParams:`);
    console.log(inOutParams);
    return pool(sql_create_bank, inOutParams, { autoCommit: true });
};

/**
 *
 * @returns
 */
module.exports.getAll = () => {
    console.log('--- Bank Model: GET ALL ---');
    const sql_getAll_banks = `SELECT 
    BNK_ID as "bankId"
    , BNK_NAME as "bankName" 
    , BNK_ADDRESS as "bankAddress"
    , BNK_CONTACT as "bankContact"
    , BNK_CONTACT_EMAIL as "bankEmail"
    , BNK_CREATION_DATE as "bankCreationDate"
    , BNK_LAST_MODIFIED as "bankLastModified"
    FROM BUDGETMAN.BANK 
    order by BNK_ID`;
    return pool(sql_getAll_banks);
};

/**
 *
 * @param {*} param0
 * @returns
 */
module.exports.getById = ({ bankId }) => {
    console.log('--- Bank Model: GET BY ID ---');
    console.log(bankId);

    const params = {
        bankId,
    };
    console.log(params);
    const sql_getBank_ById = `SELECT 
    BNK_ID as "bankId"
    , BNK_NAME as "bankName"
    , BNK_ADDRESS as "bankAddress"
    , BNK_CONTACT as "bankContact"
    , BNK_CONTACT_EMAIL as "bankEmail"
    , BNK_CREATION_DATE as "bankCreationDate"
    , BNK_LAST_MODIFIED  as "bankLastModified"
    FROM BUDGETMAN.BANK 
    WHERE BNK_ID = :bankId `;

    return pool(sql_getBank_ById, params);
};

/**
 *
 * @param {*} param0
 * @returns
 */
module.exports.getByName = ({ bankName }) => {
    const params = {
        bankName,
    };
    const sql_getBank_ByName = `SELECT 
    BNK_ID 
    , BNK_NAME 
    , BNK_ADDRESS 
    , BNK_CONTACT 
    , BNK_CONTACT_EMAIL 
    , BNK_CREATION_DATE 
    , BNK_LAST_MODIFIED  
    FROM BUDGETMAN.BANK 
    WHERE lower(BNK_NAME)  like lower('%:bankName%')`;

    return pool(sql_getBank_ByName, params);
};

/**
 * This method wil handle records updates given it's ID
 * @param {*} param0
 * @returns
 */
module.exports.updateById = ({
    bankId,
    bankName,
    bankAddress,
    bankContact,
    bankEmail,
}) => {
    console.log('--- Bank Model: Updata by ID ---');
    const inOutParams = {
        bankName,
        bankAddress,
        bankContact,
        bankEmail,
        bankId: {
            val: bankId,
            type: oracledb.NUMBER,
            dir: oracledb.BIND_INOUT,
        },
    };

    console.info('Model inOutParams:');
    console.info(inOutParams);
    console.info(inOutParams.bankId);

    const sql_update_bank = `UPDATE BUDGETMAN.BANK
        set BNK_NAME = :bankName
            , BNK_ADDRESS = :bankAddress
            , BNK_CONTACT = :bankContact
            , BNK_CONTACT_EMAIL = :bankEmail 
            , BNK_LAST_MODIFIED = sysdate
        where BNK_ID = :bankId  
        RETURNING BNK_ID into :bankId
        `;

    console.log(sql_update_bank);
    console.log(`inOutParams:`);
    console.log(inOutParams);
    return pool(sql_update_bank, inOutParams, { autoCommit: true });
};

/**
 * This Method will handle record deletions by Id
 * @param {*} param0
 * @returns
 */
module.exports.deleteById = ({ bankId }) => {
    console.log('--- Bank Model: Delete by ID ---');
    const inOutParams = {
        bankId,
    };
    console.log('inOutParams:');
    console.log(inOutParams);
    const sql_delete_bank = `DELETE FROM BUDGETMAN.BANK where BNK_ID=:bankId`;
    return pool(sql_delete_bank, inOutParams, { autoCommit: true });
};
