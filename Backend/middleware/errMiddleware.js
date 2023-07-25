
const errHandler = (err, req, res, next)=> {
 const statusCode = res.statusCode ? res.statusCode : 500 ;

   res.status(statusCode)
   res.json({
    message: err.message
   })

   next();
}

module.exports = errHandler 
