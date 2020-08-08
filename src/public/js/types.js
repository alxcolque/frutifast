/*$(document).ready(function () {
  $("#btnNewType").click(function () {
    $("#typeModal").modal();
  });
});*/

function setTypes(a,id,name) {
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
