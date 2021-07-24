const express = require("express");
const userController = require("../controllers/user-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

//TODO: Make sure that patch and delete of user can only be done by that user

router.get('/', (req, res) => userController.getAllUsers(req, res));
router.get('/:id', (req, res) => userController.getUserWithId(req, res));
router.get('/:id/donations', checkAuth,(req, res) => userController.findUserDonations(req, res));
router.get('/:id/campaigns', checkAuth, (req, res) => userController.findUserCampaigns(req, res));

router.patch('/:id', checkAuth, (req, res) => userController.updateUser(req, res));

router.delete('/:id', checkAuth,(req, res) => userController.deleteUser(req, res));

//authentication
router.post('/signup', (req, res) =>{
console.log(" =======================",JSON.stringify(req.body));    
 try{
     let userdata = {
         "id":11101,
         "lastname":req.body.lastname,
         "firstname":req.body.firstname,
         "email": req.body.email
     }
    res.json({result:"successful", data:userdata});
 }catch(error){
     console.log("signup", error);
     res.json({result:"failed", msg:error.message});
 }
});
router.post('/login', ((req, res) => userController.loginUser(req, res)))

module.exports = router;
