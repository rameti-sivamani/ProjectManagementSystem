const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const normalRoutes = require("./routes/normal");
const dashboard=require('./routes/dashboard')
const session = require("express-session");
const mongoDBStore=require('connect-mongodb-session')(session);
const db = require("./utils/db");
con
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));





app.use("/", normalRoutes);

app.use('/dashboard',dashboard);

app.listen("3000", () => {
  console.log("Listening at port 3000");
});
