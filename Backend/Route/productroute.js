const express = require('express');
 const productroute = express.Router();
 const {getallproducts, getsingleproduct} = require('../controller/productscontroller')

 productroute.get('/shop', getallproducts)
 productroute.get('/shop/:id', getsingleproduct)


module.exports = productroute

