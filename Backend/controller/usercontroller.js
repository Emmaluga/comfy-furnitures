require('dotenv').config();
require("crypto")
const asyncHandler = require('express-async-handler');
const usermodel = require('../model/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const registerController = asyncHandler (async (req,res)=> {
     const {fullname,email,password} = req.body;
     //check if user exist
     const existuser = await usermodel.findOne({email})
       if(existuser){
         res.status(500)
         throw new Error('User already exists')
       } 

       // generate salt
       const saltrounds = 10
       const salt = await bcrypt.genSalt(saltrounds)
       //hash password
       const hashpassword = await bcrypt.hash(password,salt)

        //create new user
        const newuser = await usermodel.create({
            fullname,
            email,
            password: hashpassword,
         
        })

        // res.status(200).json({ 
         if(newuser){
          res.status(200).json({
            _id: newuser.id,
            email: newuser.email,
            fullname: newuser.fullname,
            token: generateToken(newuser._id)

            
          })
         }else{
            res.status(500)
            throw new Error('invalid user')
         }
})

const loginController = asyncHandler (async (req,res)=> {
    const {email,password} = req.body
      //check for email exist
      const user = await usermodel.findOne({email})
             //compare password
            if(user && await bcrypt.compare(password, user.password)){

                //validate and send back data.
                  res.json({
                    _id: user.id,
                    email: user.email,
                    token: generateToken(user._id)
                     
                    // user
                })
            }else{
                res.status(500)
                throw new Error('password noes not match')
            }
})

const meController = asyncHandler (async (req,res)=> {
    
 
    
      const {_id, email, fullname} = await usermodel.findById(req.createdUser.id)

              res.json({
                id: _id,
                fullname,
                email

              })
})  

const forgotPasscontrl = asyncHandler ( async (req,res)=> {
   const {email} = req.body
   const olduser = await usermodel.findOne({email})
     if(!olduser){
       res.status(406)
       throw new Error("email not found!")
     }
     
      // create a crypto token and set to user
     const usertok = olduser.fgtpasstok()
     // save user
     await olduser.save()

      // const tok = process.env.FORGOTPASSTOKEN

      // create link to send to user mail
      const link = `http://localhost:3000/reset-password/${usertok}`

      // create message
      
  
    
     //generate random token

    //  const forgotsecret = process.env.SECRETKEY + olduser.password
    //  const fgtpasstoken = jwt.sign({email:olduser.email, id:olduser._id }, forgotsecret,
    //   {expiresIn: "5min"})
    //   const link = `http://localhost:3000/reset-password/${olduser.id}/${fgtpasstoken}`
    //   console.log(link)

     }) 
    
    // gen forgotpasstoken

 

      

const resetcontrl = asyncHandler ( async (req,res)=> {



    res.send("reset")
})



const generateToken =  (id)=> {
return jwt.sign({id}, process.env.SECRETKEY, {expiresIn: "30days"})
}

// const fgtpasstok = ()=> {
//   const tok =  crypto.randomBytes(20).toString("hex")
//   crypto.createHash("sha256").update(tok).digest("hex")
// }
// const genresetpasstoken = ()=> {
//   const resetToken = Crypto.randomBytes(20).toString("hex")
//   const hash = Crypto.createHash("sha256").update(resetToken).digest("hex")
 
  
//   // console.log(resetToken)
// }

module.exports = {
    registerController,
    loginController,
    meController,
    forgotPasscontrl,
    resetcontrl
}