const Donation = require("../models/donation");
const Campaign = require("../models/campaign");
const mongoose = require("mongoose");
const User = require("../models/user");

/*
Currently there is no way to delete or update a donations - this is for security reasons
 */

const getAllDonations = (req, res) => {
    Donation.find()
        .populate("campaign_id")
        .populate("user_id")
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
};

const getDonationWithId = (req, res) => {
    const id = req.params.id;
    Donation.findById(id)
        .populate("campaign_id")
        .populate("user_id")
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

const postNewDonation = async (req, res) => {
    let campaign;
    await Campaign.findById(req.body.campaign_id)
        .then(result => {
            campaign = result;
        });

    let user = await User.findById(req.userData.userId);

    console.log(campaign);
    console.log(user);

    if(campaign === null) {
        return res.status(404).json({
            message: "Campaign does not exist"
        })
    } else if(user === null) {
        return res.status(404).json({
            message: "User does not exist"
        })
    } else {
        const donation = new Donation({
                _id: new mongoose.Types.ObjectId(),
                campaign_id: req.body.campaign_id,
                user_id: user._id,
                amount_donated: req.body.amount_donated,
                date_donated: req.body.date_donated
            });

        donation.save()
            .then(result => res.json(result))
            .catch(err => res.json({message: err}));
    }
}

module.exports = {
    getAllDonations,
    getDonationWithId,
    postNewDonation,
};




