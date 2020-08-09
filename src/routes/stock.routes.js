const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../config/auth");

const {
  renderStocks,
  addStock,
  deleteStock,
} = require("../controllers/stock.controller");

// Authorization
router.use(isLoggedIn);

// Routes
router.post("/add", addStock);
router.get("/", isLoggedIn, renderStocks);
router.get("/delete/:id", deleteStock);

module.exports = router;
