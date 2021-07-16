const express = require("express");
const campaignController = require("../controllers/campaignController");

const router = express.Router();

router.get('/', (req, res) => campaignController.getAllCampaigns(req, res));
router.get('/:id', (req, res) => campaignController.getCampaignWithId(req, res));

router.post('/', (req, res) => campaignController.postNewCampaign(req, res));

router.patch('/:id', (req, res) => campaignController.updateCampaign(req, res));

router.delete('/:id', (req, res) => campaignController.deleteCampaign(req, res));

module.exports = router;
