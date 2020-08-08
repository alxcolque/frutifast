const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");
const { isLoggedIn } = require("../config/auth");

const {
  addItem,
  renderItems,
  editItem,
  deleteItem,
} = require("../controllers/item.controller");
const Item = require("../models/Item");

// Authorization
router.use(isLoggedIn);

// Image Upload

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/img/upload"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({ storage });
var cpUpload = upload.fields([
  { name: "picture", maxCount: 1 },
]);
router.post("/add", isLoggedIn, cpUpload, (req,res)=>{
    let { type_id, name, price } = req.body;
    let picture = req.files["picture"][0];
    Item.add(type_id, name, price, picture.filename).then(
      req.flash("success", name + " Se ha registado con éxito"),
      res.redirect("/items")
    );

});

//router.post("/add", addItem);
router.get("/", isLoggedIn, renderItems);
router.get("/delete/:id", isLoggedIn, deleteItem);
//router.post("/edit", isLoggedIn, editItem);
router.post("/edit", isLoggedIn, cpUpload, (req,res)=>{
    let { item_id, type_id, name, price } = req.body;
    let picture = req.files["picture"][0];
    Item.update(item_id, type_id, name, price, picture.filename).then(
      req.flash("success", name + " Se ha actuaizado con éxito"),
      res.redirect("/items")
    );
});



module.exports = router;