const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const path = require("path");
const db = require("./utils/db");
const bodyParser = require("body-parser");
const mongoDBStore = require("connect-mongodb-session")(session);
const verifyToken = require("./middleware/verify");

//Routes
const normalRoutes = require("./routes/normal");
const dashboard = require("./routes/dashboard");

//Template engines
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use("/dashboard", verifyToken, dashboard);

app.use("/", normalRoutes);



app.listen("3000", () => {
  console.log("Listening at port 3000");
});
