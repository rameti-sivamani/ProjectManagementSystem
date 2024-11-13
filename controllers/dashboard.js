const Project = require("../models/Project");
const session = require("express-session");

const dashboard = {};


dashboard.home = (req, res, next) => {
  const email = req.user.email;
  const message = req.flash("message");
  Project.find({ "team.email": email }).then((result) => {
    console.log(result);
    res.render("dashboard.ejs", {
      title: "Dashboard",
      projects: result,
      path:"/dashboard",
      owner:email
    });
  });
};

dashboard.logout = (req, res, next) => {
  res.clearCookie("token");
  req.flash("message", "Successfully Logged out");
  res.redirect("/?message=Successfully logged out!");
};
module.exports = dashboard;
