const oracledb = require('oracledb');
const path = require('path');


const {oracleConf} = require('./../config/config');


/* Activate following 2 lines for local development ONLY */
//const clientPath = path.join('C:','oracle','Oracle21c','bin');
//oracledb.initOracleClient({libDir:clientPath});

module.exports.start = async() => {
   try {
        console.log('Oracle config is:');
        console.log(oracleConf);
        //console.log(`Oracle client binaries at: ${clientPath}`);
        await oracledb.createPool(oracleConf);
    } catch (error) {
        console.log('An error occurred starting the connection...');
        console.log(error);
        throw error;
    }
    
};


module.exports.close = async()=>{
    await oracledb.getPool("default").close(0);
};

module.exports.pool = async(statement, binds=[], opts={}) => {
    console.log('-- [ Performing query against DB ] --');
    let conn;
    let result=[];

    opts.outFormat = oracledb.OBJECT;
    //opts.outFormat = oracledb.DB_TYPE_OBJECT;

    try{
        conn = await oracledb.getConnection();
        result = await conn.execute(statement, binds, opts);
        
        console.log('--- RESULT TO BE RETURNED ---');
        console.log(result);
        console.log('-----------------------------');
        return result;

    } catch(error){
        console.error('ERROR @ Oracle opening DB: '+error);
        throw error;
    } finally{
        if(conn){
            try{
                await conn.close();
            } catch(error){
                console.log('Oracle closing DB: '+error);
                throw error;
            }
        }
        
    }



};

