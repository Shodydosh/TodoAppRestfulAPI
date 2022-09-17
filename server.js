const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
// const taskRoute = require('./routes/task');
const ejsLint = require('ejs-lint');
const Task = require('./models/taskModel');


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

//! ROUTES
// var personalRoute = require('./routes/personalRoute')
// app.use('/personalView', personalRoute);
// var businessRoute = require('./routes/businessRoute')
// app.use('/businessView', businessRoute);

//! METHODS

app.get('/', async function (req, res) {
    Task.find({}, function (err, tasks) {
        res.render("index.ejs", { tasksList: tasks });
    });
});

app.get('/personalTask', async function (req, res) {
    Task.find({ type: 'personal' }, function (err, tasks) {
        res.render("personalView.ejs", { tasksList: tasks });
    });
});

app.get('/businessTask', async function (req, res) {
    Task.find({ type: 'business' }, function (err, tasks) {
        res.render("businessView.ejs", { tasksList: tasks });
    });
});

app.get('/taskTypeData', async function (req, res) {
    Task.find({}, function (err, tasks) {
        let PTtask = 0;
        let BTtask = 0;
        let PTtaskCompleted = 0;
        let BTtaskCompleted = 0;

        tasks.forEach(task => {
            if (task.type === 'personal') {
                if (task.status === true) PTtaskCompleted++;
                PTtask++;
            }
            else {
                if (task.status === true) BTtaskCompleted++;
                BTtask++;
            }
        });

        res.send({
            PTtask: PTtask,
            BTtask: BTtask,
            PTtaskCompleted: PTtaskCompleted,
            BTtaskCompleted: BTtaskCompleted
        })
    })
});

app.post('/add', async function (req, res) {
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

app.post('/update/:_id', async function (req, res) {
    const { _id } = req.params;
    Task.findByIdAndUpdate({ _id }, {
        status: (req.body.status == 'true' ? 'false' : 'true')
    })
        .then(() => {
            console.log("Task updated successfully".bgCyan);
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

//! PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

//! HOSTING
app.listen(PORT, console.log(`Server listening on ${PORT}`.brightYellow.bold));
