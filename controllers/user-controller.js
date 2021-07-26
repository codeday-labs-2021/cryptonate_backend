const User = require("../models/user");
const Donation = require("../models/donation");
const Campaign = require("../models/campaign");

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");

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
                    const token = createToken(user);
                    res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
                    return res.status(200).json(user);
                } else {
                    return res.status(401).json({
                        message: "Authentication failed"
                    });
                }
            });
        }
    });
}

const logoutUser = (req, res) => {
    //delete jwt cookie - i.e. replace jwt cookie with another one that has very short expiry
    res.cookie("jwt", "", {maxAge: 1});
    res.status(200).json({
        message: "Log out successful"
    });
}

//TODO: prevent users from updating password using this method:
const updateUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body)
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

const forgotPassword = async (req, res) => {
    User.findOne({email: req.body.email}, async (error, user) => {
        if (user === null) {
            return res.status(401).json({
                message: "No user found with given email address"
            });
        } else {
            const resetToken = user.createPasswordResetToken();
            await user.save({validateBeforeSave: false});

            const resetURL = `${req.protocol}://${req.get("host")}/api/users/resetPassword/${resetToken}`;
            const text = `If you forgot your password, submit a PATCH request with your new password to ${resetURL}.
            \nIf you did not forget your password, please ignore this email.`;

            try {
                await sendEmail({
                    email: user.email,
                    subject: "Your password reset token (valid for 10 minutes)",
                    text: text
                });

                res.status(200).json({
                    message: "Successful. Token sent to email"
                });
            } catch (e) {
                console.log(e);
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                await user.save({validateBeforeSave: false});

                return res.status(500).json({
                    message: "There was a error sending the email. Please try again later"
                });
            }

        }
    });
}

const resetPassword = async (req, res) => {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()}});


    if(!user) {
        return res.status(400).json({
            message: "Token is invalid or has expired"
        });
    } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if(err) {
                return res.status(500).json({
                    message: err
                });
            } else {
                user.password = hash;
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                await user.save();

                const token = createToken(user);
                res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
                return res.status(200).json({
                    message: "Authentication successful"
                });

            }
        });
    }
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

const maxAge = 24 * 60 * 60; //1 day
function createToken(user) {
    return jwt.sign({
        email: user.email,
        userId: user._id,
    }, process.env.JWT_KEY, {
        expiresIn: maxAge,
    });
}

module.exports = {
    getAllUsers,
    getUserWithId,
    updateUser,
    signUpUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    deleteUser,
    findUserCampaigns,
    findUserDonations
};

