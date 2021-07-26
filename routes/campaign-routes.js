const express = require("express");
const campaignController = require("../controllers/campaign-controller");
const multer = require("multer");
const auth = require("../middleware/auth-middleware");

const router = express.Router();

//TODO: add checks for authentication depending on routes

const storage = multer.diskStorage({
   destination: function(req, file, cb) {
       cb(null, "./uploads/");
   },
   filename: function(req, file, cb) {
       cb(null, Date.now() + file.originalname);
   }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error("Unaccepted file type"), false); // reject a file
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //upto 5 MB
    },
    fileFilter: fileFilter
});

//TODO: make sure users can only patch and delete the campaigns they create

router.get('/', (req, res) => campaignController.getAllCampaigns(req, res));
router.get('/:id', (req, res) => campaignController.getCampaignWithId(req, res));
router.get('/:id/donations', (req, res) => campaignController.findCampaignDonations(req, res));

router.post('/', auth.checkAuth, upload.single("image"), (req, res) => campaignController.postNewCampaign(req, res));

router.patch('/:id', auth.checkAuth, (req, res) => campaignController.updateCampaign(req, res));

router.delete('/:id', auth.checkAuth, (req, res) => campaignController.deleteCampaign(req, res));

module.exports = router;
