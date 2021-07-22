const Donation = require("../models/donation");
const Campaign = require("../models/campaign");
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

    let user;
    await User.findById(req.body.user_id)
        .then(result => {
            user = result;
        });

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
        const donation = new Donation(req.body);

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




