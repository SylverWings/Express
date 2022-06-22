const router = require("express").Router();
const taskController = require("../contrellers/TaskController");

router.get("/tasks", taskController.getAll);
router.post("/tasks", taskController.create);
router.put("/tasks/:id", (req, res)=>{
    return res.send("Task updated")
});
router.delete("/tasks/:id", (req, res)=>{
    return res.send("Task deleted")
});

module.exports = router;