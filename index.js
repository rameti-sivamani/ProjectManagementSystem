const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const normalRoutes = require("./routes/normal");
const sequelize = require("./utils/db");
const model=require('./models/User')

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", normalRoutes);

sequelize
  .sync()
  .then((res) => {
    app.listen("3000");
  })
  .catch((err) => console.log(err));
