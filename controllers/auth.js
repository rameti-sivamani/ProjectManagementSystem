const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verify");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail", // For Gmail
  auth: {
    user: "rametisivamani494@gmail.com", // replace with your email
    pass: "zsiz iqux drww uoia", // replace with your email password or app password
  },
});

require("dotenv").config();

const User = require("../models/User");

//get requuests

User.register = (req, res, next) => {
  const message = req.flash("message");
  res.render("registration.ejs", {
    path: "/register",
    title: "Register",
    message: message,
  });
};

User.login = (req, res, next) => {
  const message = req.flash("message");
  res.render("registration.ejs", {
    path: "/login",
    title: "Login",
    message: message,
  });
};
User.home = (req, res, next) => {
  const message = req.flash("message");
  res.render("index.ejs", {
    title: "Essense Flow",
    message: message,
  });
};

//post requuests

User.postRegister = (req, res, next) => {
  const { email, fullname, password } = req.body;

  User.findByEmail(email).then((user) => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    bcrypt
      .hash(password, 12)
      .then((paswd) => {
        User.createUser({
          email: email,
          fullname: fullname,
          password: paswd,
        })
          .then((user) => {
            const SECRET_KEY = process.env.SECRET_KEY;
            const token = jwt.sign(
              { id: user.id, email: user.email },
              SECRET_KEY,
              { expiresIn: "1hr" }
            );

            res.cookie("token", token, {
              httpOnly: true, // Prevent JavaScript access
              secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
              sameSite: "Strict", // Prevent CSRF attacks
              maxAge: 3600000, // Cookie expiry (1 hour)
            });
            req.flash("message", "Successfully Registered");
            res.redirect("/dashboard");
            transporter.sendMail(
              {
                from: "no-reply@essesnceflow.com",
                to: email,
                subject: `Test Email ${user.fullname} from Nodemailer`, // subject
                text: "Hello! This is a test email sent using Nodemailer in Node.js.", // plain text body
                html:
                  "<p>Hello!" +
                  user.fullname +
                  " This is a <strong>test</strong> email sent using Nodemailer in Node.js.</p>", // HTML body
              },
              (error, info) => {
                if (error) {
                  return console.log("Error:", error);
                }
                console.log("Email sent: " + info.response);
              }
            );
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
            const SECRET_KEY = process.env.SECRET_KEY;
            const token = jwt.sign(
              { id: user.id, email: user.email },
              SECRET_KEY,
              { expiresIn: "1hr" }
            );
            res.cookie("token", token, {
              httpOnly: true, // Prevent JavaScript access
              secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
              sameSite: "Strict", // Prevent CSRF attacks
              maxAge: 3600000, // Cookie expiry (1 hour)
            });
            req.flash("message", "Successfully Logged In");
            transporter.sendMail(
              {
                from: "no-reply@essesnceflow.com",
                to: email,
                subject: `Welcome Back, , ${user.fullname}! 🎉 `, // subject
                html:
                  "<p>Hi! " +
                  user.fullname +
                  "<br>We’re thrilled to have you back! Your account has been successfully logged in, and you’re ready to explore all the features we have to offer.If you need any assistance, feel free to reach out to us anytime.<br> Happy browsing!"+"<br>"+"Best regards,.<br>Essence Flow Pvt Ltd.</p>",
              },
              (error, info) => {
                if (error) {
                  return console.log("Error:", error);
                }
                console.log("Email sent: " + info.response);
              }
            );
            return res.redirect("/dashboard"); // Redirect to the dashboard
          }
          res.render("registration.ejs", {
            path: "/login",
            title: "Login",
            message: "Invalid Password ,Enter valid Password",
            redirectUrl:"/login"
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return  res.render("registration.ejs", {
        path: "/register",
        title: "Register",
        redirectUrl:'/register',
        message: "No user found please Register",
      });
    }
  });
};

User.profile = (req, res, next) => {
  const email = req.user.email;
  User.findByEmail(email).then((user) => {
    user.password = res.render("dashboard", {
      title: "Profile",
      path: "/profile",
      message: "",
      user: user,
    });
  });
};
User.updatePassword = (req, res, next) => {

  const email = req.user.email;
  const password = req.body.Password;
  const newPassword = req.body.newPassword;
  if (!password || !newPassword) {
    return res.render("dashboard", {
      title: "Profile",
      path: "/profile",
      message: "Please provide both current and new password",
      redirectUrl:"/dashboard/profile",
      user: req.user,
    });
  }
  User.findOne({email:email}).then((user) => {
    bcrypt.compare(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          // Hash the new password
          bcrypt.hash(newPassword, 12)
            .then((hashedPassword) => {
              // Update user's password with the new hashed password
              user.password = hashedPassword;
              user.save()  // Save the updated user object
                .then(() => {
                  res.render("dashboard", {
                    title: "Profile",
                    path: "/profile",
                    message: "Password Changed Successfully",
                    redirectUrl:"/dashboard/profile",
                    user: user,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).send("Error saving updated password");
                });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send("Error hashing new password");
            });
        } else {
          res.render("dashboard", {
            title: "Profile",
            path: "/profile",
            message: "Current Password is Incorrect",
            redirectUrl:"/dashboard/profile",
            user: user,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error comparing passwords");
      });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send("Error finding user");
  });
};

module.exports = User;
