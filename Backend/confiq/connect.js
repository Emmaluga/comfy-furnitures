require('dotenv').config('')
const mongoose = require('mongoose');

//  const MONGO_URL = "mongodb://localhost:27017/comfy-furniture "
// const connectDB = async ()=> {
//    try {
//     await mongoose.connect()
//     console.log('connected to DB')
//    } catch (error) {
//     console.log('failed to connected to DB')
//    }
// }

const connectDB = async (url)=> {
    return mongoose.connect(url)
}

mongoose.set('strictQuery', false);

module.exports = connectDB 



