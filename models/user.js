/*
USER SCHEMA
	//all users
	first_name: String (required)
	last_name: String (required)
	email: String (required)

	//for users that will create a campaign
	occupation: String
	organization: String
	location: String
	social_media_url: String
	website_url: String
	organization_email: String
	about: String
 */

const mongoose = require("mongoose");
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

const User = mongoose.model("User", userSchema);
module.exports = User;
