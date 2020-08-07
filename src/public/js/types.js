function setTypes(a) {
  //save_method = "add";
  $("#formAddType")[0].reset(); // reset form on modals
  //$("#typeModal").modal("show"); // show bootstrap modal
  //$("#typeModal").modal("toggle");
  //$("#typeModal").modal("show");
  //$("#typeModal").modal("hide");
  if (a == "1") {
    $(".modal-title").text('Nuevo Tipo'); // Set Title to Bootstrap modal title
  } else {
    $(".modal-title").text("Modificar Tipo");
  }
}
