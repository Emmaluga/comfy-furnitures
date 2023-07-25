const express = require('express');
const userroute = express.Router();
const {registerController,loginController,meController, forgotPasscontrl, resetcontrl} =  require('../controller/usercontroller')
const authmiddleware = require('../middleware/authmiddleware')
const {body, validationResult} = require('express-validator')

userroute.post('/register',
[
body("fullname").isLength({min:3})
.withMessage("fullname cannot be empty")
.trim(),
body("email").isEmail().normalizeEmail()
.withMessage("email cannot be blank"),

body("password").isStrongPassword({
    maxLength: 30,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1

})
.withMessage("password must have a max length of 30 ")
.withMessage("password must have a min numbers of 1 ")
.withMessage("password must have a min lowercase of 1 ")
.withMessage("password must have a min uppercase of 1 ")
.withMessage("password must have a min symbols of 1 ")

],
(req,res,next)=> {
   const errors = validationResult(req)
   if(!errors.isEmpty()){
       res.json({
        success: false,
         message: errors.array()
       })
   }

   next()
},
 registerController);

userroute.post('/login',
[
  body("email").isEmail().normalizeEmail()
  .withMessage("email cant be empty"),
  body("password").isStrongPassword({
    minLength: 8,
     maxLength: 30,
     minLowercase: 1,
     minUppercase: 1,
     minSymbols: 1
  })

  .withMessage("password must have a min length of 8 ")
  .withMessage("password must have a max length of 30 ")
  .withMessage("password must have a min numbers of 1 ")
  .withMessage("password must have a min lowercase of 1 ")
  .withMessage("password must have a min uppercase of 1 ")
  .withMessage("password must have a min symbols of 1 ")
  
],

(req,res,next)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({
         success: false,
          message: errors.array()
        })
    }
 
    next()
 },



 loginController);

 userroute.get('/me', authmiddleware,  meController),

 userroute.post("/forgotpassword", 
 
 [
   body("email").isEmail().normalizeEmail()
   .trim()
   .withMessage("Enter your email")

 ],

 (req,res,next)=> {
  const errors = validationResult(req)
   if(!errors.isEmpty()){
      res.json({
        success: false,
        message: errors.array()
      })
   }

   next()
 },
 
 forgotPasscontrl )

 userroute.get("/reset-password/:id/:token", resetcontrl)



module.exports = userroute 