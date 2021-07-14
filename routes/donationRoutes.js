const express = require("express");
const donationController = require("../controllers/donationController");

const router = express.Router();

router.get('/', (req, res) => donationController.getAllDonations(req, res));
router.get('/:id', (req, res) => donationController.getDonationWithId(req, res));

router.post('/', (req, res) => donationController.postNewDonation(req, res));


module.exports = router;
