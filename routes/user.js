const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../config/passport")(passport);
// Login Routes
router.get("/login", (req, res) => {
  res.render("./users/login", { title: "DASH - Log in" });
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/idea",
    failureRedirect: "/user/login",
    failureFlash: true
  })(req, res, next);
});

// Register routes
router.get("/register", (req, res) => {
  res.render("./users/register", { title: "DASH - Register" });
});

router.post("/register", (req, res) => {
  let { username, email, firstname, lastname, password, password2 } = req.body;

  let errors = [];

  if (!username) {
    errors.push({
      text: "Username cannot be empty"
    });
  }
  if (!email) {
    errors.push({
      text: "Email cannot be empty"
    });
  }
  if (!firstname) {
    errors.push({
      text: "First Name cannot be empty"
    });
  }
  if (!lastname) {
    errors.push({
      text: "Last Name cannot be empty"
    });
  }
  if (!password) {
    errors.push({
      text: "password cannot be empty"
    });
  }
  if (password !== password2) {
    errors.push({
      text: " password did not match"
    });
  }
  if (password.length < 6) {
    errors.push({
      text: "password should be atleast 6 characters"
    });
  }
  if (errors.length > 0) {
    res.render("./users/register", {
      errors: errors,
      username,
      email,
      password,
      password2,
      firstname,
      lastname
    });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        let condition = { email: email };
        User.findOne(condition).then(user => {
          if (user) {
            req.flash("error_msg", "User already exists");
            res.redirect("/user/login");
          } else {
            password = hash;
            let users = new User({
              firstname: firstname,
              lastname: lastname,
              email: email,
              username: username,
              password: password
            });
            users
              .save()
              .then(() => {
                req.flash("success_msg", "user registered and can log in");
                res.redirect("/user/login");
              })
              .catch(err => {
                throw err;
              });
          }
        });
      });
    });
  }
});

module.exports = router;
