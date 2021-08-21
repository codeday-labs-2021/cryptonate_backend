const Campaign = require("../models/campaign");
const Donation = require("../models/donation");
const mongoose = require("mongoose");
const User = require("../models/user");
const fileUtility = require("../utils/fileUtility");

const getAllCampaigns = (req, res) => {
    Campaign.find({}, null, {
        sort: {
            date_created: -1 //Sort by Date Created DESC
        }
    })
        .populate("author_id")
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
};

const getFourCampaigns = (req, res) => {
    Campaign.find({}, null, // Columns to Return
        {
            skip:0, // Starting Row
            limit:4, // Ending Row
            sort:{
                date_created: -1
            }
        })
        .populate("author_id")
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
};

const getCampaignWithId = (req, res) => {
    const id = req.params.id;
    Campaign.findById(id)
        .populate("author_id")
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

const uploadImage= async (req, res) => {
    try{
        console.log("===============",JSON.stringify(req.body) );
 
            const  profileImage  = req.file;
            console.log(" profileImage ===============",JSON.stringify(profileImage) );
            fileUtility.movefiletToDestination(profileImage.path,
                profileImage.filename, './uploads/compaign');
        
    }catch(error){
        console.log(" error===============",error );
        console.log(" error===============",JSON.stringify(error) );
       
    }
}

const postNewCampaign = async (req, res) => {
    try{
       
  
        let user = await User.findById(req.userData.userId);

        var base64Data = req.body.file.replace(/^data:image\/png;base64,/, "");
        let filename =  Date.now()+".png";
        require("fs").writeFile('./uploads/compaign/'+ filename, base64Data, 'base64', function(err) {
        console.log(err);
        });
        // if(!user) {
        //     console.log("no user===============" );
        //     return res.status(401).json({
        //         message: "Not authorized"
        //     })
        // } else {
            // const  profileImage  = req.file;
            // console.log(" profileImage ===============",JSON.stringify(profileImage) );
            // fileUtility.movefiletToDestination(profileImage.path,
            //     profileImage.filename, './uploads/compaign');
            const campaign = new Campaign({
                _id: new mongoose.Types.ObjectId(),
                author_id: user._id,
                title: req.body.title,
                date_created: req.body.date_created,
                date_end: req.body.date_end,
                image_url: req.file ? req.file.path : null,
                tags: req.body.tags,
                description: req.body.description,
                goal: req.body.goal,
                recipient_address: req.body.recipient_address
            });
            campaign.save()
                .then(result => res.json(result))
                .catch(err => res.json({message: err}));
       // }
    }catch(error){
        console.log(" error===============",error );
        console.log(" error===============",JSON.stringify(error) );
       
    }
}

const updateCampaign = (req, res) => {
    const id = req.params.id;
    Campaign.findByIdAndUpdate(id, req.body, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

const deleteCampaign = (req, res) => {
    const id = req.params.id;
    Campaign.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

const findCampaignDonations = (req, res) => {
    const id = req.params.id;
    Donation.find().where("campaign_id", id)
        .then(result => res.json(result))
        .catch(err => res.json({message: err}));
}

module.exports = {
    getAllCampaigns,
    getFourCampaigns,
    getCampaignWithId,
    postNewCampaign,
    updateCampaign,
    deleteCampaign,
    findCampaignDonations,
    uploadImage
};
