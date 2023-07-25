const asyncHandler = require('express-async-handler');
const productmodel = require('../model/productsmodel')

const getallproducts = asyncHandler (async (req,res)=> {
       const allproducts = await productmodel.find()
         if(!allproducts){
           res.status(500)
           throw new Error('Products does not exist in DB')
         }else{
            res.json(allproducts)
         }
     
})

const getsingleproduct = asyncHandler (async (req,res)=> {

    const singleproduct = await productmodel.findById(req.params.id);
       if(!singleproduct){
         res.status(500)
         throw new Error('No single products in DB')
       }else{
         res.json(singleproduct)
       }
  
})


module.exports = { 
    getallproducts,
    getsingleproduct
} 

