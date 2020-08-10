const salesCtrl = {};
const Sale = require("../models/Sale");
const Item = require("../models/Item");
const Stock = require("../models/Stock");

salesCtrl.addSale = async (req, res, user) => {
  let warehouse_id = 1;
  const { item_id, user_id, quantity } = req.body;
  try {
    const insertado = await Sale.add(user_id, warehouse_id);
    const saleID = await Sale.getID();
    
    if (insertado) {
      //console.log(insertado);
      req.flash("success", "Se ha añadido con éxito");
      res.redirect("/sales");
    } else {
      //console.log(insertado);
      await Sale.addDS(saleID[0].sale, item_id, quantity);
      const quant = await Sale.getQuant(warehouse_id,item_id );
      await Stock.update(
        warehouse_id,
        item_id,
        Number(quant[0].cuan) - Number(quantity)
      );
      req.flash("success", "Salida exitosa ");
      res.redirect("/sales");
    }
  } catch (e) {
    req.flash(
      "message",
      "Ya existe este producto"
    );
    res.redirect("/sales");
  }
};

salesCtrl.renderSales = async (req, res) => {
  const items = await Item.getAll();
  Sale.getAll().then((sales) => {
    res.render("users/sales", { sales, items });
  });
};

salesCtrl.deleteSale = async (req, res) => {
  const { warehouse_id, item_id } = req.body;
  await Sale.delete(warehouse_id, item_id).then(
    req.flash("success", "Eliminado Exitosamente"),
    res.redirect("/sales")
  );
};

salesCtrl.editSale = async (req, res) => {
  const { user_id, warehouse_id, item_id, quantity, oldquantity } = req.body;
  try {
    const insertado = await Sale.update(
      warehouse_id,
      item_id,
      Number(quantity) + Number(oldquantity)
    );
    //console.log(user.user_id, item_id, quantity);
    //await Sale.addPurchase(user.user_id, item_id, quantity);
    if (insertado) {
      //console.log(insertado);
      req.flash("success", "Se ha añadido con éxito");
      res.redirect("/sales");
    } else {
      //console.log(insertado);
      Sale.addPurchase(user_id, item_id, quantity);
      req.flash("success", "Acabas de añadir mas " + quantity),
        res.redirect("/sales");
    }
  } catch (e) {
    req.flash(
      "message",
      "Ya existe este producto en el sale. Para aumentar la cantidad use el boton AUMENTAR"
    );
    res.redirect("/sales");
  }
};

module.exports = salesCtrl;
