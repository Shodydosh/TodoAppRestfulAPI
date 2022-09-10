const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Task = require('../models/taskModel');

/**
 * @desc for create task 
 * @route /api/task
 * @access Public
 */

exports.createTask = asyncHandler(async (req, res) => {
    // const { title, status, type, time } = req.body;
    console.log(req.body);
    const task = new Task({
        title: req.body.title,
        type: req.body.type
    });
    if (req.body.type === 'hide') {

    }
    else {
        task.save();
    }
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

exports.updateTask = asyncHandler(async (req, res) => {
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
            data: null,
            message: 'Task not found!!'
        })
    }
})

/**
 * @desc for delete specific task 
 * @route /api/task
 * @access Public
 */

exports.deleteTask = asyncHandler(async (req, res) => {
    // existTask de check xem co task nao da ton tai voi id giong khong
    const existTask = await Task.findOne({ _id: req.params.id });
    if (existTask) {
        await existTask.remove();
        // HTTP 200 OK success status response code indicates that the request has succeeded. 
        // A 200 response is cacheable by default
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully!!'
        })
    } else {
        // HTTP 401 Unauthorized response status code indicates that the client request has not been completed 
        //because it lacks valid authentication credentials for the requested resource.
        res.status(401).json({
            success: false,
            data: null,
            message: 'Task not found!!'
        })
    }
})

/**
 * @desc for get all tasks 
 * @route /api/task
 * @access Public
 */

exports.getSingleTask = asyncHandler(async (req, res) => {
    // existTask de check xem co task nao da ton tai voi id giong khong
    const existTask = await Task.findOne({ _id: req.params.id });
    if (existTask) {
        res.status(200).json({
            success: true,
            data: existTask,
            message: 'Task found!!'
        })
    } else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Task not found!!'
        })
    }
})

/**
 * @desc for get all tasks 
 * @route /api/task
 * @access Public
 */

exports.getAllTask = asyncHandler(async (req, res) => {
    Task.find({})
        .exec(function (err, tasks) {
            if (err) {
                console.log("Error retrieving tasks list!");
            } else {
                res.json(tasks);
                html: () => {
                    res.render('index.ejs', { tasks: tasks });
                }
            }
        })
})