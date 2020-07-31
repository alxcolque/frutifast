const express = require("express");
//const mpeliculas = require("../models/peliculas");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const path = require("path");


function estalogeado(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
}

function esAdmin(req, res, next) {
  if (session.usuario.tipo == 2) next();
  else res.redirect("/");
}
router.get("/",(req, res) => {
  res.render("index");
});
router.get("/admin",(req, res) => {
  res.render("admin/index");
});

module.exports = router;