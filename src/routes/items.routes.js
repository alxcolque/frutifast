const {Router} = require('express');
const router = Router();
const db = require('../connectionDB')

router.get('/add',(req,res)=>{
	res.render('items/add');
})


module.exports = router;