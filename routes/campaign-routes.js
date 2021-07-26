const express = require("express");
const campaignController = require("../controllers/campaign-controller");
const auth = require("../middleware/auth-middleware");

const router = express.Router();

//TODO: add checks for authentication depending on routes

//TODO: make sure users can only patch and delete the campaigns they create

router.get('/', (req, res) => campaignController.getAllCampaigns(req, res));
router.get('/:id', (req, res) => campaignController.getCampaignWithId(req, res));
router.get('/:id/donations', (req, res) => campaignController.findCampaignDonations(req, res));

router.post('/', auth.checkAuth, (req, res) => campaignController.postNewCampaign(req, res));

router.patch('/:id', auth.checkAuth, (req, res) => campaignController.updateCampaign(req, res));

router.delete('/:id', auth.checkAuth, (req, res) => campaignController.deleteCampaign(req, res));

module.exports = router;
