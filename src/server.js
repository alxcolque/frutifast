const express = require('express');
const path = require('path');
const morgan = require('morgan');
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const MySQLStore = require("express-mysql-session")(session);
const handlebars = require('handlebars');


// Importing routes
const {database} = require('./config/database');
//initialization
const app = express();
require("./config/passport");
//settings

app.set('port', process.env.PORT || 4444);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    //layoutsDir: path.join(app.get("views"), "admin/layouts"),
    AdminpartialsDir: path.join(app.get("views"), "admin/partials"),
    extname: ".hbs",
    helpers: require("./config/haceunminuto"),
  })
);
//para condicion
handlebars.registerHelper("ifCond", function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
app.set('view engine', '.hbs');
//para case
handlebars.registerHelper("switch", function (value, options) {
  this.switch_value = value;
  this.switch_break = false;
  return options.fn(this);
});

handlebars.registerHelper("case", function (value, options) {
  if (value == this.switch_value) {
    this.switch_break = true;
    return options.fn(this);
  }
});

handlebars.registerHelper("default", function (value, options) {
  if (this.switch_break == false) {
    return value;
  }
});



//Midlewares
//app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secretoaleki',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req,res,next)=>{
  app.locals.message = req.flash("message");
  app.locals.success = req.flash("success");
  app.locals.user = req.user;
  next();
})

//Routes

app.use(require("./routes/index.routes"));
app.use(require("./routes/auth.routes"));
app.use(require("./routes/user.routes"));
app.use("/types", require("./routes/type.routes"));
app.use("/items", require("./routes/item.routes"));
app.use("/profile", require("./routes/user.routes"));
app.use("/warehouses", require("./routes/warehouse.routes"));
app.use("/stocks", require("./routes/stock.routes"));
app.use("/sales", require("./routes/sale.routes"));
app.use("/personals", require("./routes/personal.routes"));
app.use("/cliente", require("./routes/order.routes"));
app.use("/orders", require("./routes/order.routes"));
app.use("/cat", require("./routes/cat.routes"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));
module.exports = app;
