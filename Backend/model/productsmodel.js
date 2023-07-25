const mongoose = require('mongoose');

const productsmodel = new mongoose.Schema({

    image: {
        type: String,
        require: true,
    },

    tittle: {
        type: String,
        required: true,
    },

    price: {
     type: String,
     required: true,
     
    },

    ratings: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },

    prodcat: {
        type: String,
        required: true,
    },

    AddCart: {
        type: String,
        required: true,
    },

    BuyCart: {
        type: String,
        required: true,
    },

   discription: {

    type: String,
    required: true
   } 

})

module.exports = mongoose.model("ProductData", productsmodel);