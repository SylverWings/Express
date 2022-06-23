const router = require("express").Router();
const taskController = require("../contrellers/TaskController");
const isSuperAdmin = require('../middlewares/isSuperAdmin');
const verifyToken = require('../middlewares/verifyToken');

router.get("/tasks",verifyToken, isSuperAdmin, taskController.getAll);
router.post("/tasks", verifyToken, isSuperAdmin, taskController.create);
router.put("/tasks/:id", verifyToken, isSuperAdmin, taskController.update);
router.delete("/tasks/:id", verifyToken, isSuperAdmin, taskController.delete);

module.exports = router;