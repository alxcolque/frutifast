const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Importing routes

//initialization
const app = express();
//setings

app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'));

//Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));


//Global Variables


//Routes

app.use(require('./routes/index.routes'));

// Static Files
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;
