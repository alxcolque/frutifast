const stocksCtrl = {};
const Stock = require("../models/Stock");

stocksCtrl.addStock = async (req, res) => {
  const { name } = req.body;
  await Stock.add(name).then(
    req.flash("success", "Se ha registado con éxito"),
    res.redirect("/stocks")
  );
};

stocksCtrl.renderStocks = async (req, res) => {
  Stock.getAll().then((stocks) => {
    res.render("users/adm/stocks", { stocks });
  });
};

stocksCtrl.deleteStock = async (req, res) => {
  const { id } = req.params;
  await Type.delete(id).then(
    req.flash("success", "Eliminado Exitosamente"),
    res.redirect("/stocks")
  );
};

stocksCtrl.editStock = async (req, res) => {
  const { stock_id, name } = req.body;
  await Type.update(stock_id, name).then(
    req.flash("success", "Actualización exitosa"),
    res.redirect("/stocks")
  );
};

module.exports = stocksCtrl;
