/*
CAMPAIGN SCHEMA
    author_id: String (required)
    title: String (required)
    date_created: Date (defaults to now)
    date_end: Date
    image_url: String
    tags: Array
    description: String (required)
    goal: Number (required)
    recipient_address: String (required)
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    date_end: {
        type: Date,
        required: false,
    },
    image_url: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    goal: {
        type: Number,
        required: true,
    },
    recipient_address: {
        type: String,
        required: true
    }
});

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
