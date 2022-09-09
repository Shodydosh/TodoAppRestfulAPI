const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const mongoose = require('mongoose');
require('dotenv/config');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//! ROUTES
const homeRoute = require('./routes/home');
app.use('/home', homeRoute);

app.set("view engine", "ejs")

//To serve static files such as images, CSS files, and JavaScript files, 
//use the express.static built-in middleware function in Express.


app.use(express.static(path.join(__dirname, 'public')));

//! CONNECT TO DB
const DBurl = "mongodb://127.0.0.1:27017/taskdb"
mongoose.connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true });

//! START HOSTING
app.listen(3000);
console.log('Server started at http://localhost:' + port);