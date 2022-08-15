const express = require("express");
const app = express()
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config();
const schema = require('./routes/schema');
const workout = require('./routes/workout');

mongoose.connect('mongodb+srv://felixzandereriksson:Jesper.nu1@cluster0.9idaz.mongodb.net/vaxtorpspizzeria', { useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('connected to MongoDB..'))
.catch(err => console.error('could not connect', err))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({origin: true, credentials: true}))
app.use('/schema', schema);
app.use('/workout', workout);

const server = app.listen(process.env.PORT, () => console.log("port " + process.env.PORT));