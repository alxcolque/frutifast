const warehousesCtrl = {};
const Warehouse = require("../models/Warehouse");

warehousesCtrl.addWarehouse = async (req, res) => {
  const { name,address } = req.body;
  await Warehouse.add(name, address).then(
    req.flash("success", "Se ha registado con éxito"),
    res.redirect("/warehouses")
  );
};

warehousesCtrl.renderWarehouses = async (req, res) => {
  Warehouse.getAll().then((warehouses) => {
    res.render("users/adm/warehouses", { warehouses });
  });
};

warehousesCtrl.deleteWarehouse = async (req, res) => {
  const { id } = req.params;
  await Warehouse.delete(id).then(
    req.flash("success", "Removido Exitosamente"),
    res.redirect("/warehouses")
  );
};

warehousesCtrl.editWarehouse = async (req, res) => {
  const { warehouse_id, name,address } = req.body;
  await Warehouse.update(warehouse_id, name, address).then(
    req.flash("success", "Actualización exitosa"),
    res.redirect("/warehouses")
  );
};

module.exports = warehousesCtrl;
