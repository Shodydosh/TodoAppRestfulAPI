const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
// get the express package into this file 

// to make sure that the bodyParser middleware run before those reqs below
app.use(bodyParser.json());

//! IMPORT ROUTES   

const taskRoute = require('./routes/task');
app.use('/task', taskRoute)

//! ROUTES

//This will tell Express to serve everything in the '/public' directory as static content.
//You will need an endpoint that serves the CSS file, or use a static directory. 
//If you are using Express, the following code when configuring the app will set a directory which will be served statically.
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const index = path.join(__dirname, '/public', 'index.html');
    res.sendFile(index);
});

//! CONNECT TO DB

mongoose.connect(
    process.env.DB_CONNECTION, 
    () => console.log('Connected to DB')
)

app.listen(3000);
console.log('Server started at http://localhost:' + port);