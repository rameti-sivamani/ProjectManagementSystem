const Project = require("../models/Project");
const session = require("express-session");
const Items_Per_Page = 2;
const dashboard = {};

dashboard.home = (req, res, next) => {
  const page = +req.query.page || 1;
  const email = req.user.email;
  let totalProjects = 0;
  Project.find({ "team.email": email })
    .countDocuments()
    .then((numProjects) => {
      totalProjects = numProjects;
      return Project.find({ "team.email": email })
        .skip((page - 1) * Items_Per_Page)
        .limit(Items_Per_Page);
    })
    .then((result) => {
      res.render("dashboard.ejs", {
        title: "Dashboard",
        projects: result,
        path: "/dashboard",
        owner: email,
        currentPage: page,
        hasNextPage: Items_Per_Page * page < totalProjects,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalProjects / Items_Per_Page),
      });
    });
};

dashboard.logout = (req, res, next) => {
  res.clearCookie("token");
  req.flash("message", "Successfully Logged out");
  res.redirect("/?message=Successfully logged out!");
};
module.exports = dashboard;
