const express = require('express');
const {bankCreate, getAllBanks, bankUpdate, getById, deleteById} = require("./../controller/bank");

const router = express.Router();

router.post('/newbank', bankCreate);
router.post('/updatebank', bankUpdate);

router.get('/getAllBanks',getAllBanks);
router.get('/getById/:bankId',getById); //http://localhost:8500/getById/26

router.delete('/deleteBank/:bankId',deleteById);


module.exports = router;