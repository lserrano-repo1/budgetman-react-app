const express = require('express');
const {tranFiltered,create,getAll,getById} = require('./../controller/transaction');

const router = express.Router();

router.post('/transactions/filter',tranFiltered);
router.post('/transactions/new',create);

router.get('/transactions/getAll',getAll);
router.get('/transactions/getById/:trnId',getById);

module.exports = router;