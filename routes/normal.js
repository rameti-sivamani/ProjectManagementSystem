const express = require("express");
const app = express.Router();
const registration = require("../controllers/auth");

app.get("/register", registration.register);
app.get("/login", registration.login);
app.get("/", registration.home);


//post requests
app.post("/register", registration.postRegister);
app.post('/login',registration.postLogin);
module.exports = app;
