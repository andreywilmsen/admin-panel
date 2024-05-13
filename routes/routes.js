const express = require('express');
const router = express.Router();
const PORT = process.env.PORT;
const userController = require('../controller/userController');

router.get("/get", userController.get);

module.exports = router;
