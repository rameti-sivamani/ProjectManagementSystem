const express = require("express");
const app = express.Router();
const dashboard = require("../controllers/dashboard");
const project=require('../controllers/project')

//get requests
app.get('/',dashboard.home);

//post requests
app.post('/logout',dashboard.logout);
app.post('/create',project.createproject);
module.exports=app;