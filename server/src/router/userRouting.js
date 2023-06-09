const express = require("express");
const userController = require("../controllers/userController");
const userRouting = express.Router();


userRouting.get('/user',userController) 

module.exports = userRouting ;