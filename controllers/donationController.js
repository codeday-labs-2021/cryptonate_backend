const Donation = require("../models/donation");

/*
Currently there is no way to delete or update a donations - this is for security reasons
 */

const getAllDonations = (req, res) => {
    Donation.find()
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
};

const getDonationWithId = (req, res) => {
    const id = req.params.id;
    Donation.findById(id)
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
}

const postNewDonation = (req, res) => {
    const donation = new Donation(req.body);

    donation.save()
        .then(result => res.send(result))
        .catch(err => res.send({message: err}));
}

module.exports = {
    getAllDonations,
    getDonationWithId,
    postNewDonation,
};




