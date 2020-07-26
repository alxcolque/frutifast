const express = require('express');
const path = require('path');
const morgan = require('morgan');
const ejs = require('ejs');

// Importing routes

//initialization
const app = express();
//setings

app.set('port', process.env.PORT || 4000);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set(express.static(path.join(__dirname,'public')));




//Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Global Variables
app.use((req,res,next)=>{
	next();
})

//Routes

app.use(require('./routes/index.routes'));

app.use(require("./routes/auth.routes"));

app.use(require('./routes/auth.routes'));
app.use('/items',require('./routes/items.routes'));
app.use("/tipos", require("./routes/tipos.routes"));

// Static Files
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;
