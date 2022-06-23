const Task = require("../models/Task");
const taskController = {};

taskController.getAll = async (req, res) => {

    try {
        const userId = req.user_id;
        const tasks = await Task.find({userId}).populate("userId", ["-password"]);

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
        const {name, duration} = req.body;
        const userId = req.user_id;

        if(!name || !duration){
            return res.status(400).json({
                success: false,
                message: "Name and duration are required"
            })
        };
        
        const newTask = {
            name,            
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

taskController.update = async(req, res) => {
    try{
        const filter = {_id: req.params.id};
        
        const update = {
            name: req.body.name, 
            // status: req.body.status,
            // duration: req.body.duration,
            // userId: req.body.userId
        };
        if(req.body.name === "" || req.body.name == null){
            return res.status(400).json({
                success: false,
                message: "Campo name es obligatorio",                
            })
        }
        
            
        const taskUpdated = await Task.findOneAndUpdate(filter, update, {new: true});
        // const userUpdated = await User.findOne(filter);

        return res.status(200).json({
            success: true,
            message: "Task update success",
            data: taskUpdated
        });    
    }catch (error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error detected",
            data: error?.message || error
        })
    }
};

taskController.delete = async(req, res)=>{
    try{
        const id = req.params._id;
        const taskDeleted = await Task.deleteOne(id);
        return res.status(200).json({
            success: true,
            message: "Delete task successfully",
            data: taskDeleted
            })
    }catch (error){
        return res.status(500).json({
            success: false,
            message: "Error detected",
            data: error?.message || error
        })
    }

}

module.exports = taskController;