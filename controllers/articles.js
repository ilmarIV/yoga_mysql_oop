const articleDbModel = require('../models/article')

const articleModel = new articleDbModel();

class articleController {
  constructor() {
    const articles = []
  }

  async getAllArticles(req, res) {
    const articles = await articleModel.findAll()
    res.status(201).json({articles: articles})
  }

  async getArticleBySlug(req, res) {
    const article = await articleModel.findOne(req.params.slug)
    res.status(201).json({article: article})
  }

  async getAllArticleByAuthor(req, res) {
    const article = await articleModel.findMany(req.params.author_id)
    res.status(201).json({article: article})
  }

  async createNewArticle(req, res) {
    const newArticle = {
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      body: req.body.body,
      published: new Date().toISOString().slice(0, 19).replace('T', ' '),
      author_id: req.body.author_id
    }
    const articleId = await articleModel.create(newArticle)
    res.status(201).json({
      message: `created article with id ${articleId}`,
      article: {id: articleId, ...newArticle}
    })
  }

  async updateArticle(req, res) {
    const updateData = {}

    if (req.body.name !== undefined) updateData.name = req.body.name
    if (req.body.slug !== undefined) updateData.slug = req.body.slug
    if (req.body.image !== undefined) updateData.image = req.body.image
    if (req.body.body !== undefined) updateData.body = req.body.body
    if (req.body.published !== undefined) updateData.published = req.body.published
    if (req.body.author_id !== undefined) updateData.author_id = req.body.author_id

    const updateRows = await articleModel.update(req.params.id, updateData)
    res.status(201).json({
      message: `updated article with id ${req.params.id}`,
      article: {id: req.params.id, ...updateData }
    })
  }

  async deleteArticle(req, res) {
    const deletedRows = await articleModel.delete(req.params.id)
    res.status(201).json({
      message: `deleted article with id ${req.params.id}`,
      deletedRows: deletedRows
    })
  }
}

module.exports = articleController