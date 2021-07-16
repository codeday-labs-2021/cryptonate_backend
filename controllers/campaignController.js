const Campaign = require("../models/campaign");

const getAllCampaigns = (req, res) => {
    Campaign.find()
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
};

const getCampaignWithId = (req, res) => {
    const id = req.params.id;
    Campaign.findById(id)
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
}

const postNewCampaign = (req, res) => {
    const campaign = new Campaign(req.body);
    campaign.save()
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
}

const updateCampaign = (req, res) => {
    const id = req.params.id;
    Campaign.findByIdAndUpdate(id, req.body)
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
}

const deleteCampaign = (req, res) => {
    const id = req.params.id;
    Campaign.findByIdAndDelete(id)
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
}

module.exports = {
    getAllCampaigns,
    getCampaignWithId,
    postNewCampaign,
    updateCampaign,
    deleteCampaign
};
