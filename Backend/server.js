require('dotenv').config()
const express = require('express');
const connectDB = require('../Backend/confiq/connect');
const userroute = require('../Backend/Route/userroute');
const productroute = require('../Backend/Route/productroute')
const errHandler = require('./middleware/errMiddleware');
const routesnotfound = require('../Backend/controller/notfoundcontroller')

const cors = require('cors');
const app = express();

//middleware
app.use(cors({origin:true, credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(errHandler)


//routes
app.use('/', userroute)
app.use('/', productroute)
app.use(routesnotfound)

    

const PORT = process.env.PORT || 5000

const start = async ()=> {
    try {
        await connectDB(process.env.MONGO)
        console.log('connected to db')
        app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
   } catch (error) {
    console.log('failed to connect to db')
   }
}



start()



