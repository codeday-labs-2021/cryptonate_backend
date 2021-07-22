const User = require("../models/user");
const Donation = require("../models/donation");
const Campaign = require("../models/campaign");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = (req, res) => {
    User.find()
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
};

const getUserWithId = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

const signUpUser = (req, res) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length > 0) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            message: err
                        });
                    } else {
                        //TODO: this method does not seem to give error when required fields are not present
                        const user = new User({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: hash,

                            occupation: req.body.occupation,
                            organization: req.body.organization,
                            location: req.body.location,
                            social_media_url: req.body.social_media_url,
                            website_url: req.body.website_url,
                            organization_email: req.body.organization_email,
                            about: req.body.about,
                        });

                        user.save()
                            .then(result => res.json(result))
                            .catch(err => res.json({message: err}));
                    }
                });
            }
        });
}

const loginUser = (req, res) => {
    User.findOne({email: req.body.email}, (error, user) => {
        if(user === null) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: "Authentication failed"
                    });
                } else if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id,
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h",
                    });
                    return res.status(200).json({
                        message: "Authentication successful",
                        token: token
                    })
                } else {
                    return res.status(401).json({
                        message: "Authentication failed"
                    });
                }
            });
        }
    });
}

//TODO: use this method for resetting password
const updateUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body)
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

const findUserDonations = (req, res) => {
    const id = req.params.id;
    Donation.find().where("user_id", id)
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

const findUserCampaigns = (req, res) => {
    const id = req.params.id;
    Campaign.find().where("author_id", id)
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

module.exports = {
    getAllUsers,
    getUserWithId,
    updateUser,
    signUpUser,
    loginUser,
    deleteUser,
    findUserCampaigns,
    findUserDonations
};

