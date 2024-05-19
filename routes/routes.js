const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get("/", userController.testController);

router.post("/register", userController.registerController);

router.delete("/user/:email", userController.deleteController);

module.exports = router;
