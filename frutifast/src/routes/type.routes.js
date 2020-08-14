const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../config/auth");

const {
  renderTypes,
  addType,
  editType,
  deleteType,
} = require("../controllers/type.controller");

// Authorization
router.use(isLoggedIn);

// Routes amdin
router.post("/add", addType);
router.get("/", isLoggedIn, renderTypes);
router.get("/delete/:id", deleteType);
router.post("/edit", editType);

module.exports = router;
