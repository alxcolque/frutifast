
const Sale = require("../models/Sale");

const catCtrl = {};
catCtrl.renderCat = async (req, res) => {
  Sale.getAllCat().then((cat) => {
    res.render("users/cat", { cat });
  });
};


module.exports = catCtrl;
