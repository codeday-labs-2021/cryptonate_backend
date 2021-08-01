const express = require("express");
const walletController = require("../controllers/wallet-controller");
const auth = require("../middleware/auth-middleware");

const router = express.Router();

router.get('/usdprice',async function(req,res){
    try{ 
      let price = await  walletController.getCoingeckoPrice('ethereum') ;
      res.json( { result: "successful", data: price, message: null });
    }
     catch(err){
    
       res.json( { result: "failed", data: 0, message: null });
     }
 })


module.exports = router;
