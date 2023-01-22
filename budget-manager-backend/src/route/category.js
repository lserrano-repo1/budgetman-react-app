const express = require('express');
const {getAll, getById} = require('./../controller/category');

const router = express.Router();

router.get('/category', getAll);
router.get('/category/:id', getById);

module.exports = router;