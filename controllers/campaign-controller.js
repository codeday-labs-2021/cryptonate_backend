const Campaign = require("../models/campaign");
const Donation = require("../models/donation");
const User = require("../models/user");
const mongoose = require("mongoose");


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


//TODO: Delete image upload if save not successful (i.e. no user or incorrect request)
const postNewCampaign = (req, res) => {
    User.findById(req.body.author_id)
        .then(user => {
            if(!user) {
                return res.status(404).json({
                    message: "User does not exist"
                })
            } else {
                const campaign = new Campaign({
                    _id: new mongoose.Types.ObjectId(),
                    author_id: req.body.author_id,
                    title: req.body.title,
                    date_created: req.body.date_created,
                    date_end: req.body.date_end,
                    //image_url: req.file.path,
                    tags: req.body.tags,
                    description: req.body.description,
                    goal: req.body.goal
                });
                campaign.save()
                    .then(result => res.json(result))
                    .catch(err => res.json({message: err}));
            }
        });
}

const updateCampaign = (req, res) => {
    const id = req.params.id;
    Campaign.findByIdAndUpdate(id, req.body)
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
