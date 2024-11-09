const express = require("express");
const app = express.Router();
const dashboard = require("../controllers/dashboard");
//get requests
app.get('/',dashboard.home);

module.exports=app;