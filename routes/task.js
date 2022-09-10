const express = require('express');
const router = express.Router();

const { createTask, updateTask, getAllTask } = require('../controllers/taskController');

router.route('/').post(createTask);
router.route('/').get(getAllTask);
router.route('/:id').patch(updateTask);

module.exports = router;






// const Task = require("../models/taskModel")
// const bodyParser = require('body-parser')
// const app = express();

// // bodyParser lấy được dữ liệu nhập vào (như trong req.body)
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

// router.get("/", (req, res) => {
//     res.send({ type: 'GET' });
// })

// router.get("/home", async (req, res) => {
//     console.log("Get all the tasks");
//     Task.find({})
//         .exec(function (err, tasks) {
//             if (err) {
//                 console.log("error retrieving tasks list!");
//             } else {
//                 res.json(tasks);
//             }
//         })
// })

// //! add task
// router.post("/add", (req, res) => {
//     var tmp = req.body.title;
//     console.log(tmp);
//     const newTask = new Task({
//         title: tmp,
//         status: true,
//         type: "personal",
//     })

//     // save the new Task
//     newTask
//         .save()
//         .then(result => {
//             res.json(newTask);
//             console.log("successfully added new task!");
//             res.redirect("/");
//         })
//         .catch((err) => console.log(err));
// })

// module.exports = router;

