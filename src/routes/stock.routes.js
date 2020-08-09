const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../config/auth");

const {
  renderStocks,
  addStock,
  editStock,
  deleteStock,
} = require("../controllers/stock.controller");

// Authorization
router.use(isLoggedIn);

// Routes
router.post("/add", addStock);
router.get("/", isLoggedIn, renderStocks);
router.post("/delete", deleteStock);
router.post("/edit", editStock);

module.exports = router;
