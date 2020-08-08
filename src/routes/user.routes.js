const express = require("express");
const router = express.Router();
const User = require("../models/User");
const path = require("path");
const multer = require("multer");

// Image Upload

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/img/profile"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({ storage });
var cpUpload = upload.fields([
  { name: "pic", maxCount: 1 },
]);

const { isLoggedIn } = require("../config/auth");
const {
  renderUserAdm,
  renderUserGer,
  renderUseRes,
  renderUserCli,
  renderProfile,
  renderProfileEdit,
  updateProfile,
} = require("../controllers/user.controller");

router.get("/admin", isLoggedIn, renderUserAdm);
router.get("/gerente", isLoggedIn, renderUserGer);
router.get("/recepcion", isLoggedIn, renderUseRes);
router.get("/cliente", isLoggedIn, renderUserCli);

router.get("/profile", isLoggedIn, renderProfile);
router.get("/profile/edit", isLoggedIn, renderProfileEdit);
router.post("/profile/edit/:id", isLoggedIn, cpUpload, async(req, res) => {
  const { name, pic } = req.body;
  let pict = req.files["pic"][0];
  await User.update(req.params.id, name, pict.filename);
  req.flash("success", "Perfil actualizado exitosamente");
  res.redirect("profile");
  
});

module.exports = router;
