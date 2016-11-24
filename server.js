// set up ========================
require('zombie');
require('dotenv').config();
var http = require('http');
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

// configuration =================

var database = require('./config/database');


mongoose.connect(database.url, database.options);     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


var Account = require('./app/models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// routes =========================
require('./app/routes')(app);


// listen (start app with node server.js) ======================================
// app.listen(8080);
// console.log("App listening on port 8080");

// setup for tests
module.exports = app;
if(!module.parent) {
    http.createServer(app).listen(process.env.PORT, function() {
        console.log('Server listening on port ' + process.env.PORT);
    });
}
