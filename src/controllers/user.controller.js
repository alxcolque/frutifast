const userCtrl = {};
var inicio = "/";
userCtrl.renderUserAdm = (req, res, next) => {
  inicio = "/admin";
  res.render("users/adm/");
};
userCtrl.renderUserGer = (req, res, next) => {
  inicio = "/gerente";
  res.render("users/ger/");
};
userCtrl.renderUseRes = (req, res, next) => {
  inicio = "/recepcion";
  res.render("users/res/");
};
userCtrl.renderUserCli = (req, res, next) => {
  inicio = "/cliente";
  res.render("users/cli/");
};

module.exports = userCtrl;
