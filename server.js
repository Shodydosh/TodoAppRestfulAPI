const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const taskRoute = require('./routes/task');
const ejsLint = require('ejs-lint');
const Task = require('./models/taskModel');


const connectDB = require('./config/db');
const { getAllTask } = require('./controllers/taskController');
dotenv.config({ path: './env' });
connectDB();

const app = express();
app.use(express.json());

if (process.env.MODE === 'development') {
    app.use(morgan('dev'));
}
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());
app.use('/api/task', taskRoute);

//! EJS
app.set("view engine", "ejs")
app.get('/', async function (req, res) {
    Task.find({}, function (err, tasks) {
        res.render("index.ejs", { tasksList: tasks });
        // console.log(tasks);
    });
});

//! PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

//! HOSTING
app.listen(PORT, console.log(`Server listening on ${PORT}`.yellow.bold));
