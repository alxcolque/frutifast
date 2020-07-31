const express = require('express');
const path = require('path');
const morgan = require('morgan');
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

// Importing routes

//initialization
const app = express();
//require("./config/passport");
//setings

app.set('port', process.env.PORT || 4000);

app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));
app.set(express.static(path.join(__dirname,'public')));




//Midlewares
//app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

/*app.use(bodyParser.urlencoded({ extended: false }));
app.set(bodyParser.json());*/

app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//Global Variables
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash("success_msg");
  res.locals.errors_msg = req.flash("errors_msg");
	next();
})

//Routes

app.use(require('./routes/index.routes'));

app.use(require("./routes/auth.routes"));

app.use('/items',require('./routes/items.routes'));
app.use("/tipos", require("./routes/tipos.routes"));

// Static Files
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;
