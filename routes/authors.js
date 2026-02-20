const express = require("express");
const router = express.Router();
const authorControllerClass = require("../controllers/authors");

const authorController = new authorControllerClass()

router.get('/author/', (req, res) => authorController.getAllAuthors(req, res));
router.get('/author/:id', (req, res) => authorController.getAuthorById(req, res));

module.exports = router;
