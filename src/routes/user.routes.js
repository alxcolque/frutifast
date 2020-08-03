const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../config/auth");
const {
  renderUserAdm,
  renderUserGer,
  renderUseRes,
  renderUserCli
} = require("../controllers/user.controller");

router.get("/admin", isLoggedIn, renderUserAdm);
router.get("/gerente", isLoggedIn, renderUserGer);
router.get("/recepcion", isLoggedIn, renderUseRes);
router.get("/cliente", isLoggedIn, renderUserCli);

module.exports = router;
