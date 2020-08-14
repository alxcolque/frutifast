const indexCtrl = {};

indexCtrl.renderIndex = (req, res, user) => {
  try {
    if (req.user.rol > 0) {
      console.log("rol " + req.user.rol);
      if (req.user.rol == 4) {
        res.redirect("/admin");
      } else if (req.user.rol == 3) {
        res.redirect("/gerente");
      } else if (req.user.rol == 2) {
        res.redirect("/recepcion");
      } else {
        res.render("index");
      }
    } else {
      res.render("index");
    }
  } catch (e) {
    res.render("index");
  }
};

module.exports = indexCtrl;