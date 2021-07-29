const Campaign = require("../models/campaign");
const Donation = require("../models/donation");
const mongoose = require("mongoose");
const User = require("../models/user");


const getAllCampaigns = (req, res) => {
    Campaign.find()
        .populate("author_id")
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
};

const getCampaignWithId = (req, res) => {
    const id = req.params.id;
    Campaign.findById(id)
        .populate("author_id")
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

const postNewCampaign = async (req, res) => {
    let user = await User.findById(req.userData.userId);
    if(!user) {
        return res.status(401).json({
            message: "Not authorized"
        })
    } else {
        const campaign = new Campaign({
            _id: new mongoose.Types.ObjectId(),
            author_id: user._id,
            title: req.body.title,
            date_created: req.body.date_created,
            date_end: req.body.date_end,
            image_url: req.body.image_url,
            tags: req.body.tags,
            description: req.body.description,
            goal: req.body.goal
        });
        campaign.save()
            .then(result => res.json(result))
            .catch(err => res.json({message: err}));
    }
}

const updateCampaign = (req, res) => {
    const id = req.params.id;
    Campaign.findByIdAndUpdate(id, req.body, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

const deleteCampaign = (req, res) => {
    const id = req.params.id;
    Campaign.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

const findCampaignDonations = (req, res) => {
    const id = req.params.id;
    Donation.find().where("campaign_id", id)
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

module.exports = {
    getAllCampaigns,
    getCampaignWithId,
    postNewCampaign,
    updateCampaign,
    deleteCampaign,
    findCampaignDonations
};
