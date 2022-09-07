const express = require('express');
const router = express.Router(); 
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.json({message: err});
    }
})

router.post('/', (req, res) => {
    const task = new Task({
        title: req.body.title,
        status: req.body.status,
        type: req.body.type,
        time: req.body.time,
        id: req.body.id
    });

    task.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({message : err})
        })
} );

//! DELETE TASK
router.delete('/:taskID', async (req, res) => {
    try{
        const removeTask = await Task.remove({ _id: req.params.taskID })
        console.log("deletion success")
    } catch (err) {
        res.json({message : err});
    }
} );

//! UPDATE TASK PROPERTIES
router.patch('/:taskID', async (req, res) => {
    try{
        const updatedTask = await Task.updateOne(
            { _id: req.params.taskID },
            { $set: { title: req.body.title } }
        );
        res.json(updatedTask)
        console.log("update successfully")
    } catch (err) {
        res.json({message : err});
    }
} );

module.exports = router;