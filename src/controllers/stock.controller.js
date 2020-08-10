const stocksCtrl = {};
const Stock = require("../models/Stock");
const Item = require("../models/Item");

stocksCtrl.addStock = async (req, res, user) => {
  let warehouse_id = 1;
  const { item_id, user_id, quantity } = req.body;
  try {
    const insertado = await Stock.add(warehouse_id, item_id, quantity);
    //console.log(user.user_id, item_id, quantity);
    //await Stock.addPurchase(user.user_id, item_id, quantity);
    if (insertado) {
      //console.log(insertado);
      req.flash("success", "Se ha añadido con éxito");
      res.redirect("/stocks");
    } else {
      //console.log(insertado);
      Stock.addPurchase(user_id, item_id, quantity);
      req.flash("success", "Se ha añadido con éxito al almacén");
      res.redirect("/stocks");
    }
  } catch (e) {
    req.flash(
      "message",
      "Ya existe este producto en el stock. Para aumentar la cantidad use el boton AUMENTAR"
    );
    res.redirect("/stocks");
  }
};

stocksCtrl.renderStocks = async (req, res) => {
  const items = await Item.getAll();
  Stock.getAll().then((stocks) => {
    res.render("users/stocks", { stocks, items });
  });
};

stocksCtrl.deleteStock = async (req, res) => {
  const { warehouse_id, item_id } = req.body;
  await Stock.delete(warehouse_id, item_id).then(
    req.flash("success", "Eliminado Exitosamente"),
    res.redirect("/stocks")
  );
};

stocksCtrl.editStock = async (req, res) => {
  const {user_id, warehouse_id, item_id, quantity, oldquantity } = req.body;
  try {
    const insertado = await Stock.update(
      warehouse_id,
      item_id,
      Number(quantity) + Number(oldquantity)
    );
    //console.log(user.user_id, item_id, quantity);
    //await Stock.addPurchase(user.user_id, item_id, quantity);
    if (insertado) {
      //console.log(insertado);
      req.flash("success", "Se ha añadido con éxito");
      res.redirect("/stocks");
    } else {
      //console.log(insertado);
      Stock.addPurchase(user_id, item_id, quantity);
      req.flash("success", "Acabas de añadir mas " + quantity),
        res.redirect("/stocks");
    }
  } catch (e) {
    req.flash(
      "message",
      "Ya existe este producto en el stock. Para aumentar la cantidad use el boton AUMENTAR"
    );
    res.redirect("/stocks");
  }
};

module.exports = stocksCtrl;
