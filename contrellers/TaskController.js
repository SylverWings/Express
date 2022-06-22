const Task = require("../models/Task");
const taskController = {};

taskController.getAll = async (req, res) => {

    try {
        const tasks = await Task.find()     
        return res.status(200).json({
            success: true,
            message: 'Get all tasks retrivered successfully',
            data: tasks
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retriving tasks: ',
            error: error.message
        })
    }
};

taskController.create = async(req, res) =>{
    try {
        const {name, status, duration, userId} = req.body;

        if(!name || !status || !duration || !userId){
            return res.status(400).json({
                success: false,
                message: "Name, status, duration and userId are required"
            })
        };
        
        const newTask = {
            name, 
            status,
            duration,
            userId
        };

        await Task.create(newTask);     

        return res.status(200).json({
            success: true,
            message: "New task created",
            newTask: newTask
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Task creation failed"
        })
    }
}

module.exports = taskController;