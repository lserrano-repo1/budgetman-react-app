const DDLists = require('./../model/dropdownlists');


/**
 * This method will retrieve user's list
 * @param {*} res 
 * @param {*} req 
 * @param {*} next 
 */
module.exports.getUsersList = async(req,res,next)=>{
  try {
    const {rows} = await DDLists.ddlUsers();
    res.status(200).json({rows});
  } catch (error) {
    res.status(400).json({error:error});
  }
};


/**
 * This method will retrieve bank's list
 * @param {*} res 
 * @param {*} req 
 * @param {*} next 
 */
module.exports.getBanksList = async(req,res,next)=>{
    try {
      const {rows} = await DDLists.ddlBanks();
      res.status(200).json({rows});
    } catch (error) {
      res.status(400).json({error:error});
    }
  };

/**
 * This method will retrieve currencies list
 * @param {*} res 
 * @param {*} req 
 * @param {*} next 
 */
module.exports.getCurrenciesList = async(req,res,next)=>{
    try {
      const {rows} = await DDLists.ddlCurrency();
      res.status(200).json({rows});
    } catch (error) {
      res.status(400).json({error:error});
    }
  };

/**
 * This method will retrieve categories list
 * @param {*} res 
 * @param {*} req 
 * @param {*} next 
 */
module.exports.getCategoriesList = async(req,res,next)=>{
    try {
      const {rows} = await DDLists.ddlCategories();
      res.status(200).json({rows});
    } catch (error) {
      res.status(400).json({error:error});
    }
  };


module.exports.getTranTypes = async(req,res,next)=>{
  try {
    const {rows} = await DDLists.ddlTranType();
    res.status(200).json({rows});
  } catch (error) {
    res.status(400).json({error:error});
  }
};


module.exports.getAccounts = async(req,res,next)=>{
  try {
    const {rows} = await DDLists.ddlAccounts();
    res.status(200).json({rows});
  } catch (error) {
    res.status(400).json({error:error});
  }
};


module.exports.getCurrencyByAccountId = async (req, res, next) => {
    console.log('--- DDL Controller: getCurrencyByAccountId ---');
    const { accId } = req.params;
    console.log('accId:');
    console.log(accId);

    const inputParams = {
        accId: Number(accId),
    };

    console.info('inputParams:');
    console.info(inputParams);

    try {
        const { rows } = await DDLists.ddlCurrencyByAccountId(inputParams);
        res.status(200).json({ rows });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};