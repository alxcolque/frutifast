const personalsCtrl = {};
const Personal = require("../models/Personal");


personalsCtrl.renderPersonals = async (req, res) => {
  Personal.getAll().then((personals) => {
    res.render("users/adm/personals", { personals });
  });
};

personalsCtrl.editPersonal = async (req, res) => {
  const { user_id, rol } = req.body;
  await Personal.update(user_id, rol).then(
    req.flash("success", "Actualización exitosa"),
    res.redirect("/personals")
  );
};

module.exports = personalsCtrl;
