const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../config/auth");

const {
  renderPersonals,
  editPersonal,
} = require("../controllers/personal.controller");

// Authorization
router.use(isLoggedIn);


router.get("/", isLoggedIn, renderPersonals);
router.post("/edit", editPersonal);

module.exports = router;
