const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const path = require('path');
const taskRoute = require('./routes/task');

const connectDB = require('./config/db');
dotenv.config({ path: './env' });
connectDB();

const app = express();
app.use(express.json());


if (process.env.MODE === 'development') {
    app.use(morgan('dev'));
}
const PORT = process.env.PORT || 5000;

app.use('/api/task', taskRoute);
app.get("get", (req, res) => {
    res.send('API is runnin good!');
})


// // //! EJS
// app.set("view engine", "ejs")
// app.get('/', function (req, res) {
//     res.render('index');
// });
// //! public
// app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, console.log(`Server listening on ${PORT}`.yellow.bold));








// const mongoose = require('mongoose');
// require('dotenv/config');

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// //! EJS
// app.set("view engine", "ejs")
// app.get('/', function (req, res) {
//     res.render('index');
// });

// //! ROUTES
// const homeRoute = require('./routes/home');
// app.use("home", homeRoute);

// //To serve static files such as images, CSS files, and JavaScript files,
// //use the express.static built-in middleware function in Express.
// app.use(express.static(path.join(__dirname, 'public')));

// //! CONNECT TO DB
// const DBurl = "mongodb://127.0.0.1:27017/taskdb"
// mongoose.connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true });

// //! START HOSTING
// app.listen(3000);
// console.log('Server started at http://localhost:' + port);