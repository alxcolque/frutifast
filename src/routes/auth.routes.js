const { Router } = require("express");
const router = Router();

const User = require("../models/User");
const crypto = require("crypto");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const {
  renderSignUpForm,
  renderSignInForm,
  signup,
  signin,
  logout,
} = require("../controllers/users.controller");

router.get("/signup", renderSignUpForm);

router.post("/signup", signup);

router.get("/signin", renderSignInForm);
//Login authenticate

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//Ecriptacion
function sha256(string) {
  return crypto.createHash("sha256").update(string).digest("hex");
}

passport.use(
  new LocalStrategy((username, password, done) => {
    User.login(username, sha256(password)).then((username) => {
      if (username) {
        session.username = username;
        done(null, username);
      } else done(null, false, { info: "njsjjsjsjs" });
    });
  })
);

router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "signin",
    failureMessage: true,
  }),
  function (req, res) {
    if (session.users.rol == 1) res.redirect("/admin");
    else res.redirect("/admin");
  }
);


//logout
router.get("/logout", logout);

module.exports = router;
