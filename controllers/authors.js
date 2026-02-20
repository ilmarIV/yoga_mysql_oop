const articleDbModel = require('../models/article')
const authorDbModel = require('../models/author')

const articleModel = new articleDbModel();
const authorModel = new authorDbModel();

class authorController {
  constructor() {
    const authors = []
  }

  async getAllAuthors(req, res) {
    const authors = await authorModel.findAll()
    res.status(201).json({authors: authors})
  }

  async getAuthorById(req, res) {
    const author = await authorModel.findById(req.params.id)
    const articles = await articleModel.findMany(req.params.id)
    author['articles'] = articles
    res.status(201).json({author: author})
  }
}

module.exports = authorController