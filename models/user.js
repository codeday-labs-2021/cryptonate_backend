/*
USER SCHEMA
	//all users
	first_name: String (required)
	last_name: String (required)
	email: String (required)
	password: String (required)

	//for users that will create a campaign
	wallet_address: String
	occupation: String
	organization: String
	location: String
	social_media_url: String
	website_url: String
	organization_email: String
	about: String
 */

const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
    },


    passwordResetToken: String,
    passwordResetExpires: Date,

    wallet_address: {
        type: String,
        required: false,
    },
    occupation: {
        type: String,
        required: false,
    },
    organization: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    social_media_url: {
        type: String,
        required: false,
    },
    website_url: {
        type: String,
        required: false,
    },
    organization_email: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
    },
});

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
