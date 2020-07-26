const { Router } = require("express");
const router = Router();
const db = require("../connectionDB");
const pool = require("../connectionDB");

router.get("/add", (req, res) => {
  res.render("tipos/add");
});

router.post('/add', async(req,res)=>{
    const {name} = req.body;
    const newTipo = {
        name
    };
    await pool.query('INSERT INTO types SET ?',[newTipo]);
    res.send('Recibido');
});
router.get('/',async(req,res)=>{
    const tipos = await pool.query('SELECT * FROM types');
    res.render('tipos/list',{tipos: tipos});
});

module.exports = router;
