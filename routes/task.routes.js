const router = require("express").Router();
const taskController = require("../contrellers/TaskController");
const isSuperAdmin = require('../middlewares/isSuperAdmin');
const verifyToken = require('../middlewares/verifyToken');

router.get("/tasks", verifyToken, taskController.getAll);
router.post("/tasks", verifyToken, taskController.create);
router.put("/tasks/:id", verifyToken, taskController.update);
router.delete("/tasks/:id", verifyToken, taskController.delete);

module.exports = router;