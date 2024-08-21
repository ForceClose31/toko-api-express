const express = require('express');
const router = express.Router();
const controllerUsers = require('../controllers/users');

router.post('/register', controllerUsers.registerUser);

router.post('/login', controllerUsers.loginUser);

module.exports = router;
