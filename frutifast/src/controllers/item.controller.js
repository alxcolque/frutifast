const itemsCtrl = {};
const Item = require("../models/Item");
const Type = require("../models/Type");


itemsCtrl.renderItems = async (req, res) => {
  const types = await Type.getAll();
  const items = await Item.getAll();
  res.render("users/adm/items", { items, types });
};

itemsCtrl.deleteItem = async (req, res) => {
  const { id } = req.params;
  await Item.delete(id).then(
    req.flash("success", "Removido con éxito"),
    res.redirect("/items")
  );
};


module.exports = itemsCtrl;
