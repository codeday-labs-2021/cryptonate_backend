const express = require("express");
const donationController = require("../controllers/donation-controller");

const router = express.Router();

//TODO: should donation routes only be accessed by admin?

router.get('/', (req, res) => donationController.getAllDonations(req, res));
router.get('/:id', (req, res) => donationController.getDonationWithId(req, res));

router.post('/', (req, res) => donationController.postNewDonation(req, res));


module.exports = router;
