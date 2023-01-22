const Account = require('../model/account');


/**
 * This method will create a new bank account
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.accountCreate = async (req,res,next)=>{
    console.log("--- Account Controller: Create ---");
    const inputParams ={
        usrId: req.body.usrId,
        bnkId: req.body.bnkId,
        curId: req.body.curId,
        accNumber:req.body.accNumber,
        accBalance: req.body.accBalance
    };

    console.info("inputParams:");
    console.info(inputParams);

    try {
        const {outBinds} = await Account.create(inputParams);
        const {accId} = {outBinds};

        console.log("1.1 Create account output");
        console.log(outBinds);
        console.log("1.2 accId:");
        console.log(outBinds.accId[0]);

        res.status(200).json({
            message: "New account has been created!",
            accId: outBinds.accId[0],
            accNumber: req.body.accNumber,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            error:error,
            message:"Account number creation failed"
        });
    };
};



/**
 * This method will list all accounts
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getAll = async(req,res,next) => {
    console.log("--- Account Controller: Get All ---");
    try {
        const {rows} =await Account.getAll();
        res.status(200).json({rows});
    } catch (error) {
        res.status(400).json({error:error});
    }
};


/**
 * This method will get accounts by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getById = async(req,res,next) => {
    console.log("--- Account Controller: Get By Id ---");
    const {accId} = req.params;
    console.log("accId:");
    console.log(accId);

    const inputParams ={
        accId: Number(accId),
    };

    console.info("inputParams:");
    console.info(inputParams);
    try {
        const {rows} =await Account.getById(inputParams);
        res.status(200).json({rows});
    } catch (error) {
        res.status(400).json({error:error});
    }
};


/**
 * This method will get an account number LIKE a given number
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getByAccNumberLike = async(req,res,next) => {
    console.log("--- Account Controller: Get by account number LIKE ---");
    const {accNumber} = req.params;
    console.log("accNumber:");
    console.log(accNumber);

    const inputParams ={
        accNumber: Number(accNumber),
    };

    console.info("inputParams:");
    console.info(inputParams);
    try {
        const {rows} =await Account.getByAccNumberLike(inputParams);
        res.status(200).json({rows});
    } catch (error) {
        res.status(400).json({error:error});
    }
};


/**
 * This method will get an account given an EXACT number
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getByAccNumberExact = async(req,res,next) => {
    console.log("--- Account Controller: Get by account number EXACT ---");
    const {accNumber} = req.params;
    console.log("accNumber:");
    console.log(accNumber);
console.log( req.params);
    const inputParams ={
        accNumber: Number(accNumber),
    };

    console.info("inputParams:");
    console.info(inputParams);
    try {
        const {rows} =await Account.getByAccNumberExact(inputParams);
        res.status(200).json({rows});
    } catch (error) {
        res.status(400).json({error:error});
    }
};

/**
 * This will update account balance ONLY
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.updateAccount = async(req,res,next)=>{
    console.log("--- Bank Controller: Update Balance ---");
    const inputParams ={
        accId: req.body.accId,
        accBalance: req.body.accBalance,
    };

    console.info("inputParams:");
    console.info(inputParams);

    try {
        const {outBinds} = await Account.updateAccountBalance(inputParams);
        const {accId} = {outBinds};

        console.log("1.1 Update account output");
        console.log(outBinds);
        console.log("1.2 accId:");
        console.log(outBinds.accId[0]);


        res.status(200).json({
            message: "Account balance updated",
            bankId: outBinds.accId[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            error:error
        });
    };
};


/**
 * This method will update account data
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.updateAccount = async(req,res,next)=>{
    console.log("--- Account Controller: Update  ---");
    const inputParams ={
        accId: req.body.accId,
        usrId: req.body.usrId,
        curId: req.body.curId,
        accNumber: req.body.accNumber,
        accBalance: req.body.accBalance,
    };

    console.info("inputParams:");
    console.info(inputParams);

    try {
        const {outBinds} = await Account.updateAccount(inputParams);
        const {accId} = {outBinds};

        console.log("1.1 Update account output");
        console.log(outBinds);
        console.log("1.2 accId:");
        console.log(outBinds.accId[0]);


        res.status(200).json({
            message: "Account balance updated",
            bankId: outBinds.accId[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            error:error
        });
    };
};




/**
 * This will delete account only if it exists and have zero balance
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.deleteById = async(req,res,next)=>{
    console.log("--- Account Controller: Delete by ID ---");
    const {accId} = req.params;
    console.log("accId:");
    console.log(accId);

    if(accId !==""){
        const inputParams ={
            accId: Number(accId),
        };

        try {

            const {rows} = await Account.getById(inputParams);
            console.log("rows:");
            console.log(rows);
            if(rows.length>0 && rows[0]['accId']=== inputParams.accId){
                 console.log(`About to delete record ${accId}`);
                const valret= await Account.deleteById(inputParams);
                return res.status(200).json({ message: 'record was deleted' });
            }  

            return res.status(200).json({ message: 'There is no such record to be deleted!' });

        } catch (error) {
            return res.status(400).json({ error: error });
        }

    } else {
        return res.status(400).json(
            { message: "Cannot delete record, ID was not provided" }
            );
    }

}




/**
 * Gets currency for any given account number
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.findAccountCurrency = async (req, res, next) => {
    console.log('--- Account Controller: Find account currency ---');
    const { accNumber } = req.params;
    console.log('accNumber:');
    console.log(accNumber);

    if (accNumber !== '') {
        const inputParams = {
            accNumber,
        };

        try {
            
            const {rows} =await Account.findAccountCurrency(inputParams);
            res.status(200).json({rows});

        } catch (error) {
            return res.status(400).json({ error: error });
        }
    } else {
        return res
            .status(400)
            .json({ message: 'Cannot find currency for the given account number' });
    }
};


