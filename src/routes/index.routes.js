const {Router} = require('express');
const router = Router();

const {renderIndex, renderAbout} = require('../controllers/index.controller');

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signin", (req, res) => {
  //mensaje = req.flash("info")[0];

  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;