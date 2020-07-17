const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

// Importing routes

//initialization
const app = express();
//setings

app.set('port', process.env.PORT || 4000);

app.set('views',path.join(__dirname,'views'));

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), '/layouts'),
	partialsDir: path.join(app.get('views'), '/partials'),
	extname: '.hbs',
	helpers: require('./helpers/handlebars')
}));

app.set('view engine','.hbs');

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
app.use(require('./routes/auth.routes'));
app.use('/links',require('./routes/links.routes'));

// Static Files
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;
