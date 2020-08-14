const ordersCtrl = {};
const Order = require("../models/Order");
const Item = require("../models/Item");
const Stock = require("../models/Stock");

ordersCtrl.renderAdd = async (req, res) => {
  res.render("users/cli/addorder");
};

ordersCtrl.addOrder = async (req, res, user) => {
  let state = 1;
  let warehouse_id = 1;
  
  try {
    const { user_id, item_id, address, quantity } = req.body;
    const maxcant = await Stock.getQuant(warehouse_id, item_id);

    if (quantity <= maxcant[0].cuan) {
      Stock.update(1, item_id, Number(maxcant[0].cuan) - Number(quantity));
      await Order.add(user_id, item_id, address, quantity, state);
      req.flash("success", "Orden se ha procesado con éxito ");
      res.redirect("/cliente");
    } else {
      req.flash(
        "message",
        "No tenemos esa cantidad por favor reduzca la cantidad a ordenar"
      );
      res.redirect("/cliente");
    }
  } catch (e) {
    req.flash("message", "Orden no procesado");
    res.redirect("/cliente");
  }
};

ordersCtrl.renderOrders = async (req, res) => {
  Order.getAll().then((orders) => {
    res.render("users/adm/orders", { orders });
  });
};
ordersCtrl.renderOrderMin = async (req, res) => {
  Order.getMenos().then((orders) => {
    res.render("users/adm/ordermin", { orders });
  });
};
ordersCtrl.completeOrder = async (req, res) => {
  var state = 2;
  const { id } = req.params;
  try {
    const insertado = await Order.updateStateOrder(id, state);
    if (insertado) {
      req.flash("success", "Se ha añadido con éxito");
      res.redirect("/orders");
    } else {
      req.flash("success", "Orden se ha procesado con éxito ");
      res.redirect("/orders");
    }
  } catch (e) {
    req.flash("message", "Orden no procesado");
    res.redirect("/orders");
  }
};
ordersCtrl.desOrder = async (req, res) => {
  var state = 3;
  const { order_id, warehouse_id, item_id, quantity } = req.body;
  try {
    const insertado = await Order.updateStateOrder(order_id, state);
    if (insertado) {
      req.flash("success", "Se ha añadido con éxito");
      res.redirect("/orders");
    } else {
      const maxcant = await Stock.getQuant(warehouse_id, item_id);
      Stock.update(warehouse_id, item_id, Number(maxcant[0].cuan) + Number(quantity));
      req.flash("success", "El rechazo realizado con éxito");
      res.redirect("/orders");
    }
  } catch (e) {
    req.flash("message", "Orden no procesado");
    res.redirect("/orders");
  }
};

module.exports = ordersCtrl;
