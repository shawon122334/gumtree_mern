const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const expressRateLimit = require('express-rate-limit');
const userRouting = require('./router/userRouting');



const reqLimiter = expressRateLimit({
    windowMs : 1 * 60 * 1000, // 1 minute   
    max : 10,
    message : 'Too many attempts.Please try again later!'
});
//middleware
app.use(morgan('dev'));
app.use(xssClean()); 
app.use(reqLimiter); 

app.use(bodyParser.json()); // to get req.body data
app.use(bodyParser.urlencoded({extended:true})); // to get form data from req.body


// routing 
app.use('/api/',userRouting);

const isLoggedIn =(req,res,next) =>{
    const logIn = true;
    if(logIn){
        req.body.id = 101;
        next();
    }
    else{
        return res.status(401).json({message:"please log in"});
    }
    
}

     

//http request & response 
app.get("/test",(req,res)=>{
    res.status(200).send({
        message : "api is working"
    })
})

// client error middleware
app.use((req,res,next)=>{
    // res.status(404).json({message: "route not found!"});
    
    next(createError(404,"route not found"));
});
// server error middleware -> all the errors will be found here
app.use((err, req, res, next) => {
    /*console.error(err.stack)
    res.status(500).send('Something broke!');
    */
   return res.status(err.status || 500).json({
    success: false,
    message: err.message})
  });

module.exports=app;