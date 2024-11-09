const bcrypt = require("bcryptjs");
const User = require("../models/User");

User.register = (req, res, next) => {
  res.render("registration.ejs", {
    path: "/register",
    title: "Register",
  });
};

User.login = (req, res, next) => {
  res.render("registration.ejs", {
    path: "/login",
    title: "Login",
  });
};
User.home = (req, res, next) => {
  res.render("index.ejs", {
    title: "Essense Flow",
  });
};

User.postRegister = (req, res, next) => {
  const { email, fullname, password } = req.body;

  User.findByEmail(email).then((user) => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    bcrypt
      .hash(password, 12)
      .then((paswd) => {
        User
          .createUser({
            email: email,
            fullname: fullname,
            password: paswd,
          })
          .then((result) => {
            console.log(result);
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

User.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findByEmail(email).then((user) => {
    if (user) {
      bcrypt
        .compare(password, user.password)
        .then((isFound) => {
          if (isFound) {
            console.log("User logged in");
            return res.redirect("/");
          }
          return res.status(400).json({ message: "Invalid password" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res.status(400).json({ message: "The email does not exist" });
    } 
  });
};
module.exports = User;
