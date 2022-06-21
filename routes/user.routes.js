const router = require('express').Router();
const userController = require('../contrellers/UserController');


router.get("/users", userController.getAll);
router.post("/users", userController.post);
router.get("/users/:id", userController.getUserById);

module.exports = router;