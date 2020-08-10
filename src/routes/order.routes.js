const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../config/auth");

const {
    renderAdd,
  renderOrders,
  addOrder,
} = require("../controllers/order.controller");

// Authorization
router.use(isLoggedIn);

// Routes
router.get("/add", renderAdd);
router.post("/add", addOrder);
router.get("/", isLoggedIn, renderOrders);

module.exports = router;
