const express = require("express");
const router = express.Router();
const userControllerClass = require("../controllers/users");

const userController = new userControllerClass()

router.get('/users/register', (req, res) => {
    res.render('register');
});

router.get('/users/login', (req, res) => {
    res.render('login');
});

router.post('/users/register', (req, res) => userController.register(req, res));
router.post('/users/login', (req, res) => userController.login(req, res));

router.get('/users/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('logout');
    });
});

module.exports = router;
