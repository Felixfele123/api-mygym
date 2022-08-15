const express = require("express");
const app = express()
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config();
//nytt
const auth = require('./routes/auth')
const menu = require('./routes/menu');
const login = require('./routes/login')
const logout = require('./routes/logout')


mongoose.connect('mongodb+srv://felixzandereriksson:Jesper.nu1@cluster0.9idaz.mongodb.net/vaxtorpspizzeria', { useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('connected to MongoDB..'))
.catch(err => console.error('could not connect', err))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({origin: true, credentials: true}))
//nytt
app.use('/menu', menu);
app.use('/login', login)
app.use('/secret', auth)
app.use('/logout', logout)

const server = app.listen(process.env.PORT, () => console.log("port " + process.env.PORT));