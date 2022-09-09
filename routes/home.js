const express = require('express');
const router = express.Router();
const Task = require("../models/Task")
const bodyParser = require('body-parser')
const app = express();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

app.get("/render", async (req, res) => {
    console.log("Get all the tasks");
    Task.find({})
        .exec(function (err, tasks) {
            if (err) {
                console.log("error retrieving tasks list!");
            } else {
                res.json(tasks);
            }
        })
})

//! add task 
router.post("/add", (req, res) => {
    var tmp = req.body.title;
    console.log(tmp);
    const newTask = new Task({
        title: tmp,
        status: true,
        type: "personal",
    })

    // save the new Task 
    newTask
        .save()
        .then(result => {
            res.json(newTask);
            console.log("successfully added new task!");
            res.redirect("/");
        })
        .catch((err) => console.log(err));
})

module.exports = router;

