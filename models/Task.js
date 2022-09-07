const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: String,
    status: Boolean,
    type: String,
    time: String, 
    id: Number
})

module.exports = mongoose.model('Tasks', taskSchema)