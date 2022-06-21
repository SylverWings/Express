const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    duration: Number,
    date: Date
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;