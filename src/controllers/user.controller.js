const userCtrl = {};
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
userCtrl.renderUserCli = (req, res, next) => {
  inicio = "/cliente";
  res.render("users/cli/");
};
userCtrl.renderProfile = (req, res, next) => {
  res.render("users/profile");
};
userCtrl.renderProfileEdit = (req, res, next) => {
  res.render("users/edit");
};



module.exports = userCtrl;
