const express = require('express');
const {getExchangeRateForGivenCurrency} = require('./../controller/exhangeRate');

const router = express.Router();


router.get('/exchgrate/getrate/:curId',getExchangeRateForGivenCurrency);

module.exports = router;