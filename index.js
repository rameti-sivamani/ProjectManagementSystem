require("dotenv").config();

if (!process.env.SECRET_KEY) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("SECRET_KEY must be set in production");
  }
  console.warn("SECRET_KEY is not set; using a development-only key.");
  process.env.SECRET_KEY = "local-development-jwt-secret";
}
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const path = require("path");
const db = require("./utils/db");
const bodyParser = require("body-parser");
const mongoDBStore = require("connect-mongodb-session")(session);
const middleware = require("./middleware/verify");

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
    secret: process.env.SESSION_SECRET || "local-development-session-secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use("/dashboard", middleware.verifyToken, dashboard);

app.use("/", middleware.TokenAvailable, normalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
