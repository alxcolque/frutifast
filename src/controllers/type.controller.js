
const typesCtrl = {};
const Type = require("../models/Type");
const pool = require("../connectionDB");

typesCtrl.addType = async (req, res) => {
  const { name} = req.body;
  const newType = {
    name,
  };
  await pool.query("INSERT INTO types set ?", [newType]);
  req.flash("success", "Se ha registado con éxito");
  res.redirect("/types");
};

typesCtrl.renderTypes = async (req, res) => {
  const types = await pool.query("SELECT * FROM types ", [
    req.types,
  ]);
  res.render("users/adm/types" , { types });
};

typesCtrl.deleteType = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM types WHERE type_id = ?", [id]);
  req.flash("success", "Tipo removido Exitosamente");
  res.redirect("/types");
};


typesCtrl.editType = async (req, res) => {
  const {type_id, name} = req.body;
  const newType = {
    type_id,
    name
  };
  await pool.query("UPDATE types set ? WHERE type_id = ?", [newType, type_id]);
  req.flash("success", "Type Updated Successfully");
  res.redirect("/types");
};

module.exports = typesCtrl;
