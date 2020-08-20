const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../config/auth");

const { renderCat } = require("../controllers/cat.controller");

// Authorization
router.use(isLoggedIn);

// Routes
router.get("/", isLoggedIn, renderCat);
module.exports = router;
