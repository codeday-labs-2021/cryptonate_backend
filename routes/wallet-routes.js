const express = require("express");
const walletController = require("../controllers/wallet-controller");
const auth = require("../middleware/auth-middleware");

const router = express.Router();

//TODO: Make sure that patch and delete of user can only be done by that user
//authentication

router.get('/usdprice',async function(req,res){
    try{ 
      let price = await  walletController.getCoingeckoPrice('ethereum') ;
      console.log("usdprice ======",price);
      res.json( { result: "successful", data: price, message: null });
    }
     catch(err){
    
       res.json( { result: "failed", data: 0, message: null });
     }
 })


module.exports = router;
