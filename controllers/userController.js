const User = require("../models/user");
const Donation = require("../models/donation");
const Campaign = require("../models/campaign");

const getAllUsers = (req, res) => {
    User.find()
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
};

const getUserWithId = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
}

const postNewUser = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
}

const updateUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body)
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
}

const findUserDonations = (req, res) => {
    const id = req.params.id;
    Donation.find().where("user_id", id)
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
}

const findUserCampaigns = (req, res) => {
    const id = req.params.id;
    Campaign.find().where("author_id", id)
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
}

module.exports = {
    getAllUsers,
    getUserWithId,
    updateUser,
    postNewUser,
    deleteUser,
    findUserCampaigns,
    findUserDonations
};

