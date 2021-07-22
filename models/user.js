/*
USER SCHEMA
	//all users
	first_name: String (required)
	last_name: String (required)
	email: String (required)
	password: String (required)

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
const bcrypt = require("bcrypt");
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

userSchema.pre('save', async function(next){
    if (this.isNew || this.isModified('password')) this.password = await bcrypt.hash(this.password, saltRounds)
    next()
});

const User = mongoose.model("User", userSchema);
module.exports = User;
