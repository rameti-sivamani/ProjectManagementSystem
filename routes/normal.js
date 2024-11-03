const express = require("express");
const app = express.Router();
const registration = require("../controllers/registration");
app.use("/", registration.home);
app.use("/register", registration.register);
app.use("/login", registration.login);

module.exports = app;
