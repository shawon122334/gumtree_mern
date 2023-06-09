const createError = require("http-errors");
const users = require("../models/userModel");

const userController = (req,res,next)=> {
    try{
        console.log(req.body.id);
    res.status(200).send({
        message : "this is user profile",
        users : users
    })
    }
    catch(error){
        next(error)
    }
}

module.exports = userController;        