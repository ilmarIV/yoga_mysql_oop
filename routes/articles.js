const express = require("express");
const router = express.Router();
const articleControllerClass = require("../controllers/articles");
const isAdmin = require('../utils/isAdmin');

const articleController = new articleControllerClass()

router.get('/article/', (req, res) =>
    articleController.getAllArticles(req, res)
);

router.get('/article/:slug', (req, res) =>
    articleController.getArticleBySlug(req, res)
);

router.post('/article/create', (req, res) =>
    articleController.createNewArticle(req, res)
);

router.post('/article/update/:id', (req, res) =>
  articleController.updateArticle(req, res)
);

router.get('/article/delete/:id',
    isAdmin,
    (req, res) => articleController.deleteArticle(req, res)
);

module.exports = router;
