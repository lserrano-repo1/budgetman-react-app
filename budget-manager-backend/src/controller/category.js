const Category = require('./../model/categories');

/**
 * This method will get the whole list of categories in the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getAll = async(req,res,next) =>{
    try {
        const {rows} = await Category.getAll();
        res.status(200).json({data:rows});
    } catch (error) {
        res.status(400).json({error:error});
    }    
};


/**
 * This method will get a category name by giving its id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getById = async(req,res,next)=>{
    const {id} = req.params;
    const inputParams ={
        catId:Number(id),
    };

    //validate catId is number, otherwhise return error

    try {
        const {rows} = await Category.getById(inputParams)
        res.status(200).json({data:rows});
    } catch (error) {
        res.status(400).json({error:error});
    }
};


module.exports = {
    getAll
    , getById
}