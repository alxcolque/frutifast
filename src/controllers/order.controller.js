const ordersCtrl = {};
const Order = require("../models/Order");
const Item = require("../models/Item");
const Stock = require("../models/Stock");

ordersCtrl.renderAdd = async (req, res) => {
  res.render("users/cli/addorder");
};


ordersCtrl.addOrder = async (req, res, user) => {
  let state = 1;
  const {  user_id, item_id,address, quantity } = req.body;
  try {
    const insertado = await Order.add(user_id, item_id, address, quantity,state);

    if (insertado) {
      //console.log(insertado);
      req.flash("success", "Se ha añadido con éxito");
      res.redirect("/cliente");
    } else {
      //console.log(insertado);
      req.flash("success", "Orden se procesado con éxito ");
      res.redirect("/cliente");
    }
  } catch (e) {
    req.flash("message", "Orden no procesado");
    res.redirect("/cliente");
  }
};

ordersCtrl.renderOrders = async (req, res) => {
  /*const items = await Item.getAll();
  Order.getAll().then((orders) => {
    res.render("users/orders", { orders, items });
  });*/
  res.render("users/adm/orders");
};

module.exports = ordersCtrl;
