const express = require("express");
const userController = require("../controllers/user-controller");
const auth = require("../middleware/auth-middleware");

const router = express.Router();

//authentication
router.post('/signup', (req, res) => userController.signUpUser(req, res));
router.post('/login', (req, res) => userController.loginUser(req, res));
router.get('/logout', (req, res) => userController.logoutUser(req, res));

//user routes
router.get('/', (req, res) => userController.getAllUsers(req, res));
router.get('/donations', auth.checkAuth,(req, res) => userController.findUserDonations(req, res));
router.get('/campaigns', auth.checkAuth, (req, res) => userController.findUserCampaigns(req, res));
router.get('/:id', (req, res) => userController.getUserWithId(req, res));

router.patch('/:id', auth.checkAuth, (req, res) => userController.updateUser(req, res));

router.delete('/:id', auth.checkAuth,(req, res) => userController.deleteUser(req, res));

//password reset
router.post('/forgotPassword', (req, res) => userController.forgotPassword(req, res));
router.patch('/resetPassword/:token', (req, res) => userController.resetPassword(req, res));

module.exports = router;
