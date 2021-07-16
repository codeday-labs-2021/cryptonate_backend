const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get('/', (req, res) => userController.getAllUsers(req, res));
router.get('/:id', (req, res) => userController.getUserWithId(req, res));
router.get('/:id/donations', (req, res) => userController.findUserDonations(req, res));
router.get('/:id/campaigns', (req, res) => userController.findUserCampaigns(req, res));

router.post('/', (req, res) => userController.postNewUser(req, res));

router.patch('/:id', (req, res) => userController.updateUser(req, res));

router.delete('/:id', (req, res) => userController.deleteUser(req, res));

module.exports = router;
