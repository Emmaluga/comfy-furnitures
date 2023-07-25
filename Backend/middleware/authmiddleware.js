const check = require('dotenv').config();
console.log(check)
const usermodel = require('../model/usermodel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');



const authmiddleware = asyncHandler ( async (req,res,next)=> {
    //declare variable
    let token;

    //check for bearers in headers
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         
            try {
              // store in token and split
              token = req.headers.authorization.split(" ")[1]
              //verify token
              const decoded = jwt.verify(token,process.env.SECRETKEY)
              //store and get token in createduser 
              req.createdUser = await usermodel.findById(decoded.id).select("-password")

                next()

            } catch (error) {
                //means not the right token for the actual user.
                console.log(error)
                res.status(401)
                throw new Error('not authorized ')
            }
            // means no token provided
            if(!token){
                res.status(401)
                throw new Error('not authorized no token')
            }
      }
    //   else{
    //     res.status(401)
    //     throw new console.error('not working');
    //   }

      
    })
    
    module.exports  = authmiddleware 



// //set up a middleware function
// const protectroute = asyncHandler ( async (req,res,next)=> {
    
//     let = token;
   

//     //token will be sent in http headers.
//     //check for authorization in the http headers.
//     // the http headers has an authorization object.
//     // check to see if it start with bearers.

//      if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      
//     //         //get token from header.
//             // assign token to the variable
//             try {
//                 token = req.headers.authorization.split(" ")[1]
//                 //verify token
            
//                 const decoded = jwt.verify(token, process.env.SECRETKEY)
                
              
                 
//                 //get user from the token
//                 // select is used to not include the password
//         req.user = await usermodel.findById(decoded.id).select("-password")
         

//                 next()

//             } catch (error) {
//                 console.log(error)
//                 res.status(401)
//                 throw new Error("not authorized")
//             }
//     }
//       if(!token){
      
//       res.status(401)
//       throw new Error("not authorized no token")
//       }
// })



// module.exports = {
//     protectroute
// }