const stocksCtrl = {};
const Stock = require("../models/Stock");
const Item = require("../models/Item");

stocksCtrl.addStock = async (req, res) => {
  let warehouse_id = 1;
  const { item_id, quantity } = req.body;
  try{
    const insertado =  await Stock.add(warehouse_id, item_id, quantity);
    if (insertado){
      console.log(insertado);
      req.flash("success", "Se ha añadido con éxito");
      res.redirect("/stocks");
    }else{
      console.log(insertado);
      req.flash("success", "Se ha añadido con éxito");
      res.redirect("/stocks");
    }
  }catch(e){
    req.flash("message", "Ya existe este producto en el stock. Para aumentar la cantidad use el boton AUMENTAR");
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
  const { warehouse_id, item_id, quantity, oldquantity } = req.body;
  await Stock.update(warehouse_id, item_id, Number(quantity) + Number(oldquantity)).then(
    req.flash("success", "Acabas de añadir mas "+quantity),
    res.redirect("/stocks")
  );
};

module.exports = stocksCtrl;
