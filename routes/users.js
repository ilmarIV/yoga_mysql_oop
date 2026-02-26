const express = require("express");
const router = express.Router();
const userControllerClass = require("../controllers/users");

const userController = new userControllerClass()

router.post('/users/register', (req, res) => userController.register(req, res));
router.post('/users/login', (req, res) => userController.login(req, res));

module.exports = router;
