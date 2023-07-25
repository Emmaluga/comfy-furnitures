require('dotenv').config();
const productdata = require('../Backend/data/productsData');
const productmodel = require('../Backend/model/productsmodel');
const connectdb = require('../Backend/confiq/connect');

connectdb(process.env.MONGO)

const dataload = async ()=> {
  try {
    await productmodel.deleteMany({})
    await productmodel.insertMany(productdata);
    console.log('data loaded sucessfully to DB')
    process.exit()
  } catch (error) {
    console.log('failed to loaded data sucessfully to DB')
    process.exit(1)
  }
}

dataload()