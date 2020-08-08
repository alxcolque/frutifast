const itemsCtrl = {};
const Item = require("../models/Item");
const Type = require("../models/Type");
itemsCtrl.addItem = async (req, res) => {
  /*let pic = req.files["picture"][0];*/
  const { type_id, name, price } = req.body;

  /*await Item.add(type_id, name, price, picture).then(
    req.flash("success", name + " Se ha registado con éxito"),
    res.redirect("/items")
  );*/
  res.send(type_id, name, price);
  console.log(type_id, name, price);
};

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

itemsCtrl.editItem = async (req, res) => {
  const { item_id, type_id, name, price } = req.body;
  let picture = req.files["picture"][0];
  await Item.update(item_id, type_id, name, price, picture).then(
    req.flash("success", "La actualizacíon se realizó con éxito"),
    res.redirect("/items")
  );
};

module.exports = itemsCtrl;
