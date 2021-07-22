/*
DONATION SCHEMA
    campaign_id: String (required)
    user_id: String (required)
    amount_donated: Number (required)
    date_donated: Date
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    campaign_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount_donated: {
        type: Number,
        required: true,
    },
    date_donated: {
        type: Date,
        default: Date.now(),
    }
});

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
