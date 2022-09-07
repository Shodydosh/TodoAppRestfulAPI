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
})

module.exports = router;