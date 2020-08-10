const userCtrl = {};
const Stock = require("../models/Stock");
const Item = require("../models/Item");
var inicio = "/";
userCtrl.renderUserAdm = (req, res, next) => {
  inicio = "/admin";
  res.render("users/adm/");
};
userCtrl.renderUserGer = (req, res, next) => {
  inicio = "/gerente";
  res.render("users/adm/");
};
userCtrl.renderUseRes = (req, res, next) => {
  inicio = "/recepcion";
  res.render("users/adm/");
};
userCtrl.renderUserCli = async (req, res, next) => {
  inicio = "/cliente";
  const items = await Item.getAll();
  Stock.getAll().then((stocks) => {
    res.render("users/cli/", { stocks, items });
  });
};
userCtrl.renderProfile = (req, res, next) => {
  res.render("users/profile");
};
userCtrl.renderProfileEdit = (req, res, next) => {
  res.render("users/edit");
};



module.exports = userCtrl;
