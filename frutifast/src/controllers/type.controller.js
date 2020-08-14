const typesCtrl = {};
const Type = require("../models/Type");

typesCtrl.addType = async (req, res) => {
  const { name, unit} = req.body;
  await Type.add(name, unit).then(
    req.flash("success", "Se ha registado con éxito"),
    res.redirect("/types")
  );
};

typesCtrl.renderTypes = async (req, res) => {
  Type.getAll().then((types) => {
    res.render("users/adm/types", { types });
  });
};

typesCtrl.deleteType = async (req, res) => {
  const { id } = req.params;
  await Type.delete(id).then(
    req.flash("success", "Tipo removido Exitosamente"),
    res.redirect("/types")
  );
};

typesCtrl.editType = async (req, res) => {
  const { type_id, name, unit } = req.body;
  await Type.update(type_id, name, unit).then(
    req.flash("success", "Actualización exitosa"),
    res.redirect("/types")
  );
};

module.exports = typesCtrl;
