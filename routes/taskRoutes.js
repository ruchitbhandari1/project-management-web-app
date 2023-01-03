const express = require('express');
const taskController = require('../controllers/taskController.js');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.use(authController.protect);
router.get('/getAll/:projectId', taskController.getAllTasks);
router.post('/create', taskController.create)
router.delete('/delete/:taskId', taskController.delete)
router.get('/toggleCompleted/:taskId', taskController.toggleCompleted)

module.exports = router;