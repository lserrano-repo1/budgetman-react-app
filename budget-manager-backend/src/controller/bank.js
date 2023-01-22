const Bank = require('../model/bank');


/**
 * This controller method will handle new bank creation
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.bankCreate = async(req,res,next)=>{
    console.log("--- Bank Controller: Create ---");
    const inputParams ={
        bankName: req.body.bankName,
        bankAddress: req.body.bankAddress,
        bankContact: req.body.bankContact,
        bankEmail: req.body.bankEmail
    };

    console.info("inputParams:");
    console.info(inputParams);

    try {
        const {outBinds} = await Bank.create(inputParams);
        const {bankId} = {outBinds};

        console.log("1.1 Create bank output");
        console.log(outBinds);
        console.log("1.2 bankId:");
        console.log(outBinds.bankId[0]);

        res.status(200).json({
            message: "New bank created",
            bankId: outBinds.bankId[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            error:error
        });
    };
};


/**
 * This method will handle bank updates
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.bankUpdate = async(req,res,next)=>{
    console.log("--- Bank Controller: Update ---");
    const inputParams ={
        bankId: req.body.bankId,
        bankName: req.body.bankName,
        bankAddress: req.body.bankAddress,
        bankContact: req.body.bankContact,
        bankEmail: req.body.bankEmail
    };

    console.info("inputParams:");
    console.info(inputParams);

    try {
        const {outBinds} = await Bank.updateById(inputParams);
        const {bankId} = {outBinds};

        console.log("1.1 Update bank output");
        console.log(outBinds);
        console.log("1.2 bankId:");
        console.log(outBinds.bankId[0]);


        res.status(200).json({
            message: "Bank info has been updated",
            bankId: outBinds.bankId[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            error:error
        });
    };
};


/**
 * This controller method will retrieve all registered banks
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getAllBanks = async(req,res,next) => {
    try {
        const {rows} =await Bank.getAll();
        res.status(200).json({data:rows});
    } catch (error) {
        res.status(400).json({error:error});
    }
};

/**
 * This controller method will retrieve info by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getById = async(req,res,next) =>{
    console.log("--- Bank Controller: GetById ---");
    const {bankId} = req.params;
    console.log("bankId:");
    console.log(bankId);

    const inputParams ={
        bankId: Number(bankId),
    };

    console.info("inputParams:");
    console.info(inputParams);
    try {
        const {rows} =await Bank.getById(inputParams);
        res.status(200).json({data:rows});
    } catch (error) {
        res.status(400).json({error:error});
    }
};


/**
 * Delete records given its ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.deleteById = async(req,res,next)=>{
    console.log("--- Bank Controller: DeleteByID ---");
    const {bankId} = req.params;
    console.log("bankId:");
    console.log(bankId);

    if(bankId !==""){
        const inputParams ={
            bankId: Number(bankId),
        };

        try {

            const {rows} = await Bank.getById(inputParams);
            console.log("rows:");
            console.log(rows);
            if(rows.length>0 && rows[0]['bankId']=== inputParams.bankId){
                 console.log(`About to delete record ${bankId}`);
                const valret= await Bank.deleteById(inputParams);
                return res.status(200).json({ message: 'record was deleted' });
            }  

            return res.status(200).json({ message: 'There is no such record to be deleted!' });

        } catch (error) {
            return res.status(400).json({ error: error });
        }

    } else {
        return res.status(400).json(
            { message: "Cannot delete record, id was not provided" }
            );
    }

}