const ExcRate = require('./../model/exchangeRate');

module.exports.getExchangeRateForGivenCurrency = async (req, res, next) => {
    console.log('--- Exchange Rate: getExchangeRateForGivenCurrency ---');
    const { curId } = req.params;
    console.log('curId:');
    console.log(curId);

    const inputParams = {
        curId: Number(curId),
    };

    console.info('inputParams:');
    console.info(inputParams);

    try {
        const { rows } = await ExcRate.getExchangeRateForGivenCurrency(inputParams);
        res.status(200).json({ rows });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

