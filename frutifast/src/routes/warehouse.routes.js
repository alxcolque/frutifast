const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../config/auth");

const {
  renderWarehouses,
  addWarehouse,
  editWarehouse,
  deleteWarehouse,
} = require("../controllers/warehouse.controller");

// Authorization
router.use(isLoggedIn);

// Routes warehouse
router.post("/add", addWarehouse);
router.get("/", isLoggedIn, renderWarehouses);
router.get("/delete/:id", deleteWarehouse);
router.post("/edit", editWarehouse);

module.exports = router;
