const express = require("express");
const app = express()
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



mongoose.connect('mongodb+srv://felixzandereriksson:Jesper.nu1@cluster0.9idaz.mongodb.net/vaxtorpspizzeria', { useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('connected to MongoDB..'))
.catch(err => console.error('could not connect', err))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin: true, credentials: true}))
app.use(bodyParser.urlencoded({ extended: true}));

//nytt
app.use('/menu', menu);
app.use('/login', login)
app.use('/secret', auth)
app.use('/logout', logout)

const server = app.listen(process.env.PORT, () => console.log("port " + process.env.PORT));