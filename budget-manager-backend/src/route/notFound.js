const express = require('express');

const router = express.Router();

router.use( (req, res, next) =>{
    res.status(404).json({message: "requested url was not found or is not valid"});
});

module.exports = router;