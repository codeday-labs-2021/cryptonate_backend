
const express = require('express');
const fetch = require("node-fetch");

async function getCoingeckoPrice(tokenId) {
    try{
    
      let res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
      );
      let data = await res.json();
      return data[tokenId]["usd"];
    } catch(err){
      return -1;
    }
  }

  module.exports = {
    getCoingeckoPrice
};
