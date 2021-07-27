const express = require("express");
const donationController = require("../controllers/donation-controller");
const {checkAuth} = require("../middleware/auth-middleware");

const router = express.Router();

router.get('/', (req, res) => donationController.getAllDonations(req, res));
router.get('/:id', (req, res) => donationController.getDonationWithId(req, res));

router.post('/', checkAuth, (req, res) => donationController.postNewDonation(req, res));


module.exports = router;
