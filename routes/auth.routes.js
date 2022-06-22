const authController = require("../contrellers/AuthController");
const router = require("express").Router();

router.post("/auth/register", authController.register);

module.exports = router;