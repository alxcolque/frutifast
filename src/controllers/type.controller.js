
const typesCtrl = {};
const Type = require("../models/Type");
const pool = require("../connectionDB");

typesCtrl.renderAddType = (req, res) => {
  res.render("types/add");
};

typesCtrl.addType = async (req, res) => {
  const { name} = req.body;
  const newType = {
    name,
  };
  await pool.query("INSERT INTO types set ?", [newType]);
  req.flash("success", "Se ha registado con éxito");
  res.redirect("admin/types");
};

typesCtrl.renderTypes = async (req, res) => {
  const types = await pool.query("SELECT * FROM types ", [
    req.types,
  ]);
  res.render("users/adm/types" , { types });
};

typesCtrl.deleteType = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE ID = ?", [id]);
  req.flash("success", "Link Removed Successfully");
  res.redirect("/links");
};

typesCtrl.renderEditType = async (req, res) => {
  const { id } = req.params;
  const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  console.log(links);
  res.render("links/edit", { link: links[0] });
};

typesCtrl.editType = async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  const newType = {
    title,
    description,
    url,
  };
  await pool.query("UPDATE links set ? WHERE id = ?", [newType, id]);
  req.flash("success", "Link Updated Successfully");
  res.redirect("/links");
};

module.exports = typesCtrl;
