const express = require ('express');
const morgan = require ('morgan');
const expphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const{database} = require('./keys');
//inicializacion 
const app =express();
require('./lib/passport');
//configuraciones 
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars' )
}));
app.set('view engine','.hbs');
//middlewares
app.use(session({
    secret:'proyecto-web',
    resave:false,
    saveUninitialized:false,
    store: new MySQLStore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extends:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next)=>{
    app.locals.success=req.flash('success');
    app.locals.message=req.flash('message');
    app.locals.user=req.user;
    next();
    
});

//RUTAS
app.use(require('./routes'));
app.use(require('./routes/auth.routes'));
app.use('/links', require('./routes/links.routes'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//iniciando el servidor
app.listen(app.get('port',),()=>{
    console.log('server on port', app.get('port'));
});