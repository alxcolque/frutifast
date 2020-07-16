const express = require('express');
const path = require('path');


//initialization
const app = express();
//setings

app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));

//Midlewares

app.use(express.urlencoded({extended:false}));

//Global Variables


//Routes

app.get('/',(req,res)=>{
	res.send('Hello world');
	});

// Static Files

module.exports = app;
