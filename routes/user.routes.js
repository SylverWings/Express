const router = require('express').Router();
const userController = require('../contrellers/UserController');


router.get("/users", userController.getAll);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.post);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

module.exports = router;