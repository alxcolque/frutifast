const { findById } = require("../models/User");
const userCrtl = {};
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const User = require("../models/User");
const { Passport } = require("passport");
const crypto = require("crypto");

//Ecriptacion
function sha256(string) {
  return crypto.createHash("sha256").update(string).digest("hex");
}

//registro
userCrtl.renderSignUpForm = (req, res) => {
  res.render("signup");
};

userCrtl.signup = (req, res) => {
  const errors = [];
  const { name, user, pass, confirm_pass } = req.body;
  if (pass != confirm_pass) {
    errors.push({ text: "Password do not Match" });
  }
  if (pass.length < 4) {
    errors.push({ text: "Password moust be at last 4 characters." });
  }
  if (errors.length > 0) {
    res.render("signup", {
      errors,
      name,
      user,
    });
  } else {
    User.register(name, user, sha256(pass), 1).then(
      req.flash("success_msg", "You are registered"),
      res.redirect("signin")
    );
  }
};

//login

userCrtl.renderSignInForm = (req, res) => {
  
  res.render("signin");
};/*
passport.use(
  new LocalStrategy((username, password, done) => {
    User.login(username, sha256(password)).then((users) => {
      if (users) {
        session.users = users;
        return done(null, users);
      } else return done(null, false, { info: "njsjjsjsjs" });
    });
  })
);


(userCrtl.signin = passport.authenticate("local", {
  failureRedirect: "signin",
  failureMessage: true,
})),
  function (req, res) {
    if (session.usuario.tipo == 1) res.redirect("/admin");
    else res.redirect("/admin");
  };

/*(userCrtl.signin = passport.authenticate("local", {
  failureRedirect: "signin",
  successRedirect: "/admin",
  failureMessage: true
})),
  function (req, res) {
    console.log("iniciado");
    if (session.users.rol == 1) res.redirect("/admin");
    else res.redirect("/admin");
  };*/
  //logout
  userCrtl.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out now.");
    res.redirect("signin");
  };

module.exports = userCrtl;
