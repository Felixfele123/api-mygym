const express = require("express");
var connect = require('connect')
var app = connect();
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config();
//nytt
const cookieParser = require("cookie-parser");
const auth = require('./routes/auth')
const menu = require('./routes/menu');
const login = require('./routes/login')
const logout = require('./routes/logout')
const bodyParser = require('body-parser')

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

//...
app.use(function middleware1(req, res, next) {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'cool beans' }));
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    next();
  });
  app.use(function middleware2(req, res, next) {
    // middleware 2
    next();
  });



mongoose.connect('mongodb+srv://felixzandereriksson:Jesper.nu1@cluster0.9idaz.mongodb.net/vaxtorpspizzeria', { useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('connected to MongoDB..'))
.catch(err => console.error('could not connect', err))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({origin: true, credentials: true}))
app.use(bodyParser.urlencoded({ extended: false}));

//nytt
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://192.168.1.120.TDL"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
app.use('/menu', menu);
app.use('/login', login)
app.use('/secret', auth)
app.use('/logout', logout)

const server = app.listen(process.env.PORT, () => console.log("port " + process.env.PORT));