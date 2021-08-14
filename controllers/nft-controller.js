const express = require("express");
const fs = require('fs-extra');
const Donation = require("../models/donation");
const Campaign = require("../models/campaign");
const mongoose = require("mongoose");
const User = require("../models/user");
let path = require("path");
const fileUtility = require('./utils/fileUtility');
const destinationDir = "./assets/uploads/artwork_big";

async function saveToFile(campaignID,
                          name,
                          description,
                          donorsName,
                          amount,
                          donorsAddress ){
    try{
        let destinationPath = `./../campaigns/${campaignID}/nft.json`;
        let data = {
          "campaignID":campaignID,
          "name": name,
          "description": description,
          "image":"../asset."+_imageType,
          "donors": donorsName,
          "amount": amount,
          "wallet":donorsAddress
        }
        await  fs.outputFile( path.resolve(__dirname,`./../campaigns/${compaignID}/nft.json`),JSON.stringify(data));
        return destinationPath;
        }
    catch(error){

    }
}

