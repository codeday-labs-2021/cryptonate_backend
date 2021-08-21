const express = require("express");
const campaignController = require("../controllers/campaign-controller");
const auth = require("../middleware/auth-middleware");
const multer = require("multer");
const router = express.Router();

//Create storage for images
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log("storage ============= ");
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        console.log("storage ============= ");
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
    storage: imageStorage
});

router.get('/', (req, res) => campaignController.getAllCampaigns(req, res));
router.get('/get4', (req, res) => campaignController.getFourCampaigns(req, res));
router.get('/:id', (req, res) => campaignController.getCampaignWithId(req, res));
router.get('/:id/donations', (req, res) => campaignController.findCampaignDonations(req, res));

router.post('/', [auth.checkAuth,  upload.single("file")], (req, res) => campaignController.postNewCampaign(req, res));
 router.post('/uploadImage',  upload.single("file"), (req, res) => campaignController.uploadImage(req, res));

router.patch('/:id', auth.checkAuth, (req, res) => campaignController.updateCampaign(req, res));

router.delete('/:id', auth.checkAuth, (req, res) => campaignController.deleteCampaign(req, res));

module.exports = router;
