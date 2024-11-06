const User = require("../models/User");
exports.register = (req, res, next) => {
  res.render("registration.ejs", {
    path: "/register",
  });
};

exports.login = (req, res, next) => {
  res.render("registration.ejs", {
    path: "/login",
  });
};
exports.home = (req, res, next) => {
  res.render("index.ejs");
};

exports.postRegister = (req, res, next) => {
  const { email, username, password } = req.body;

  User.create({
    email: email,
    username: username,
    password: password,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
};
