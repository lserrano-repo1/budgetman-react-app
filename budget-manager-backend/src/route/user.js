const express = require('express');
const router = express.Router();

const {userLogin, registerNewUser} = require('./../controller/user');

router.post('/newuser', registerNewUser);
router.post('/login', userLogin);


module.exports = router;