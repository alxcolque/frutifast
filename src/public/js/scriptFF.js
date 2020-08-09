/*$(document).ready(function () {
  $("#btnNewType").click(function () {
    $("#typeModal").modal();
  });
});*/

function setTypes() {
  $("#formAddType")[0].reset(); // reset form on modals
  $("#typeModalAdd").modal("show");
  $(".modal-title").text('Nuevo Tipo');
  /*$("#formAddType").on("submit", function (e) {
      e.preventDefault();
      $.post("types/add", $(this).serialize(), function (data) {
      $.get("/");
      });
    });*/
}
function updateTypes(id, name) {
  $("#formAddType")[0].reset();
  $("#typeModalEdit").modal("show");
  $(".modal-title").text("Modificar Tipo");
  $('[name="name"]').val(name);
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