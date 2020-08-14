const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../config/auth");

const {
  renderSales,
  addSale,
  editSale,
  deleteSale,
  reporteSale,
} = require("../controllers/sale.controller");

// Authorization
router.use(isLoggedIn);

// Routes
router.post("/add", addSale);
router.get("/", isLoggedIn, renderSales);
router.post("/delete", deleteSale);
router.post("/edit", editSale);
router.get("/reporte", reporteSale);
module.exports = router;
