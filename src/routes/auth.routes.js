const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  renderSignUp,
  signUp,
  renderSignIn,
  signIn,
  logout,
} = require("../controllers/auth.controller");

// SIGNUP
router.get("/signup", renderSignUp);
router.post("/signup", signUp);

// SINGIN
router.get("/signin", renderSignIn);

router.post("/signin",
passport.authenticate("local.signin"),
function (req, res, user) {
  if (req.user.rol > 0) {
    console.log("rol" + req.user.rol);
    if (req.user.rol == 4) {
      res.redirect("/admin");
    } else if (req.user.rol == 3) {
      res.redirect("/gerente");
    } else if (req.user.rol == 2) {
      res.redirect("/recepcion");
    } else {
      res.redirect("/cliente");
    }
  } else {
    res.redirect("/signin");
  }
});


router.get("/logout", logout);

module.exports = router;
