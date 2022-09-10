const mongoose = require('mongoose');
const expressHandler = require('express-async-handler');

const Task = require('../models/taskModel');

/**
 * @desc for create task 
 * @route /api/task
 * @access Public
 */

exports.createTask = expressHandler(async (req, res) => {
    const { title, status, type, time } = req.body;
    const task = await Task.create({ title, status, type, time });
    //HTTP Status 201 indicates that as a result of HTTP POST request, 
    //one or more new resources have been successfully created on the server
    res.status(201).json({
        success: true,
        data: task,
        message: 'Task created successfully!!'
    });
})

/**
 * @desc for update tasks 
 * @route /api/task
 * @access Public
 */

exports.updateTask = expressHandler(async (req, res) => {
    const { title, status, type, time } = req.body;
    // existTask de check xem co task nao da ton tai voi id giong khong
    const existTask = await Task.findOne({ _id: req.params.id });
    if (existTask) {
        existTask.title = title;
        existTask.status = status;
        existTask.type = type;
        existTask.time = time;
        const updatedTask = await existTask.save();
        // HTTP 200 OK success status response code indicates that the request has succeeded. 
        // A 200 response is cacheable by default
        res.status(200).json({
            success: true,
            data: updatedTask,
            message: 'Task updated successfully!!'
        })
    } else {
        // HTTP 401 Unauthorized response status code indicates that the client request has not been completed 
        //because it lacks valid authentication credentials for the requested resource.
        res.status(401).json({
            success: false,
            message: 'Task not found!!'
        })
    }
})

/**
 * @desc for get all tasks 
 * @route /api/task
 * @access Public
 */

exports.getAllTask = expressHandler(async (req, res) => {
    Task.find({})
        .exec(function (err, tasks) {
            if (err) {
                console.log("error retrieving tasks list!");
            } else {
                res.json(tasks);
            }
        })
})