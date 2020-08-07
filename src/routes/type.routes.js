const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../config/auth");

const {
  renderTypes,
  renderAddType,
  addType,
  renderEditType,
  editType,
  deleteType,
} = require("../controllers/type.controller");

// Authorization
router.use(isLoggedIn);

// Routes amdin
router.get("/types/add", renderAddType);
router.post("/types/add", addType);
router.get("/types", isLoggedIn, renderTypes);
router.get("/types/delete/:id", deleteType);
router.get("/types/edit/:id", renderEditType);
router.post("/types/edit/:id", editType);

module.exports = router;
