const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

router.get('/getByEmail/:email', userController.getUserByEmail);

module.exports = router;