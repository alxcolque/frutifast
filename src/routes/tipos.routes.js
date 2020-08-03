const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../config/auth");

const {
  renderAddLink,
  addLink,
  renderLinks,
  deleteLink,
  editLink,
  renderEditLink,
} = require("../controllers/tipo.controller");

// Authorization
router.use(isLoggedIn);

// Routes
router.get("/add", renderAddLink);
router.post("/add", addLink);
router.get("/", isLoggedIn, renderLinks);
router.get("/delete/:id", deleteLink);
router.get("/edit/:id", renderEditLink);
router.post("/edit/:id", editLink);

module.exports = router;
