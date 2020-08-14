const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../config/auth");

const {
  renderAdd,
  renderOrders,
  addOrder,
  renderOrderMin,
  desOrder,
  completeOrder,
} = require("../controllers/order.controller");

// Authorization
router.use(isLoggedIn);

// Routes
router.get("/add", renderAdd);
router.post("/add", addOrder);
router.get("/", isLoggedIn, renderOrders);

router.get("/complete/:id", isLoggedIn, completeOrder);
router.post("/desOrder/", isLoggedIn, desOrder);

router.get("/ordermin", renderOrderMin);

module.exports = router;
