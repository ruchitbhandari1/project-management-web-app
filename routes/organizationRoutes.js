const express = require('express');
const organizationController = require('../controllers/organizationController.js');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.get('/getAll', organizationController.getAllOrganizations);
router.get('/get/:orgId', organizationController.getOrganization)

router.use(authController.protect);
router.get('/getMy', organizationController.getMyOrganizations);
router.get('/requestToJoin/:orgId', organizationController.requestToJoin);

router.post('/create', organizationController.createOrganization);
router.get("/getRequests/:orgId", organizationController.getRequests);
router.get(
  "/acceptRequest/:orgId/:userId",
  organizationController.acceptRequest
);
router.get("/rejectRequest/:orgId/:userId", organizationController.rejectRequest);

module.exports = router;