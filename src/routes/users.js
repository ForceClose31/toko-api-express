const express = require('express');
const router= express.Router();
const controllerUsers = require('../controllers/users')

router.get('/', controllerUsers.getAllUsers);

router.post('/', controllerUsers.createNewUsers);

module.exports = router