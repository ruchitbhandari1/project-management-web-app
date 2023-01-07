const express = require('express');
const projectController = require('../controllers/projectController.js');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.get('/get/:projectId', projectController.getProject);

router.use(authController.protect);
router.post('/create', projectController.createProject);
router.post('/addMember', projectController.addMember);
router.post('/removeMember', projectController.removeMember);
router.get("/getMyOrgProjects/:orgId", projectController.getMyOrgProjects);
router.delete('/delete/:projectId', projectController.deleteProject);

module.exports = router;