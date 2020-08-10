function setTypes() {
  $("#formAddType")[0].reset(); // reset form on modals
  $("#typeModalAdd").modal("show");
  $(".modal-title").text('Nuevo Tipo');
}
function updateTypes(id, name, unit) {
  $("#formAddType")[0].reset();
  $("#typeModalEdit").modal("show");
  $(".modal-title").text("Modificar Tipo");
  $('[name="name"]').val(name);
  $('[name="unit"]').val(unit);
  $('[name="type_id"]').val(id);
}
function setItems() {
  $("#formAddItems")[0].reset();
  $("#itemModalAdd").modal("show");
  $(".modal-title").text("Nuevo Producto");
}

function selectType(type_id){
  $('[name="type_id"]').val(type_id);
}

function updateItem(item_id, type_id, name, price) {
  $("#formEditItem")[0].reset();
  $("#itemModalEdit").modal("show");
  $(".modal-title").text("Modificar Item");
  $('[name="item_id"]').val(item_id);
  $('[name="type_id"]').val(type_id);
  $('[name="name"]').val(name);
  $('[name="price"]').val(price);
}


function setWarehouse() {
  $("#formAddWarehouse")[0].reset(); // reset form on modals
  $("#modalAddWarehouse").modal("show");
  $(".modal-title").text("Nuevo Almacén");
}
function updateWarehouse(id, name, address) {
  $("#formEditWarehouse")[0].reset();
  $("#modalEditWarehouse").modal("show");
  $(".modal-title").text("Modificar Almacén");
  $('[name="warehouse_id"]').val(id);
  $('[name="name"]').val(name);
  $('[name="address"]').val(address);
}

///Stock
function setStoks() {
  $("#formAddStoks")[0].reset(); // reset form on modals
  $("#modalAddStoks").modal("show");
  $(".modal-title").text("Nuevo Entrada");
}
function updateStocks(warehouse_id, item_id, quantity) {
  $("#modalEditStocks").modal("show");
  $("#formEditStocks")[0].reset();
  $(".modal-title").text("¿Qué cantidad mas desea añadir?");
  $('[name="warehouse_id"]').val(warehouse_id);
  $('[name="item_id"]').val(item_id);
  $('[name="oldquantity"]').val(quantity);
}
function selectItems(item_id) {
  $('[name="item_id"]').val(item_id);
}
function deleteStock(warehouse_id, item_id) {
  $("#formDeleteStoks")[0].reset();
  $("#modalDeleteStoks").modal("show");
  $('[name="warehouse_id"]').val(warehouse_id);
  $('[name="item_id"]').val(item_id);
}
//fin stock

//sales
function setSale() {
  $("#modalAddSales").modal("show");
  $("#formAddSales")[0].reset(); // reset form on modals
  $(".modal-title").text("Nuevo Salida");
}

function updateRol(user_id) {
  $("#modalEditRol").modal("show");
  $("#formEditRol")[0].reset(); // reset form on modals
  $(".modal-title").text("Actualizar Rol");
}
function selectUser(rol) {
  $('[name="rol"]').val(rol);
}
function ordenar(item_id){
  
  //alert(item_id);
}
function orderAdd(item_id) {
  $("#modalAddOrder").modal("show");
  $("#formAddOrder")[0].reset(); // reset form on modals
  $(".modal-title").text("Realizar Orden");
  $('[name="item_id"]').val(item_id);
}