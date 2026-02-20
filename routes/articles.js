const express = require("express");
const router = express.Router();
const articleControllerClass = require("../controllers/articles");

const articleController = new articleControllerClass()

router.get('/article/', (req, res) => articleController.getAllArticles(req, res));
router.get('/article/:slug', (req, res) => articleController.getArticleBySlug(req, res));
router.post('/article/create', (req, res) => articleController.createNewArticle(req, res));
router.put('/article/:id', (req, res) => articleController.updateArticle(req, res));
router.delete('/article/delete/:id', (req, res) => articleController.deleteArticle(req, res));

module.exports = router;
