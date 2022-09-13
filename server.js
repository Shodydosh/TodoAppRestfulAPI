const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
// const taskRoute = require('./routes/task');
const ejsLint = require('ejs-lint');
const Task = require('./models/taskModel');
const asyncHandler = require('express-async-handler');


const connectDB = require('./config/db');
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

//! EJS
app.set("view engine", "ejs")

//! METHODS
app.get('/', async function (req, res) {
    Task.find({}, function (err, tasks) {
        res.render("index.ejs", { tasksList: tasks });
    });
});

app.post('/add', async function (req, res) {
    console.log(req.body);
    const task = new Task({
        title: req.body.title,
        type: req.body.type
    });
    task.save();
    console.log("New task added".bgGreen);
    res.redirect('/');
})

app.post('/delete/:_id', async function (req, res) {
    const { _id } = req.params;
    Task.deleteOne({ _id })
        .then(() => {
            console.log("Task deleted successfully".bgRed);
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

//! PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

//! HOSTING
app.listen(PORT, console.log(`Server listening on ${PORT}`.yellow.bold));
