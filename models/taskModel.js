const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        require: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', taskSchema)

//* this is a blueprint for the database