const articleDbModel = require('../models/article')

const articleModel = new articleDbModel();

class articleController {
  constructor() {}

  async getAllArticles(req, res) {
    const articles = await articleModel.findAll()
    if (!articles || articles.length === 0) {
      return res.render('index', {
        articles: [],
        noArticles: true,
        msg: 'No articles found'
      })
    }

    res.render('index', {
      articles: articles,
      noArticles: false
    })
  }


  async getArticleBySlug(req, res) {
    const article = await articleModel.findOne(req.params.slug)
    if (!article) {
      return res.render('index', {
        articles: [],
        msg: 'Article not found'
      })
    }

    res.render('article', {
      article: article
    })
  }


  async getAllArticleByAuthor(req, res) {
  const articles = await articleModel.findMany(req.params.author_id)
  res.render('index', {
    articles: articles,
    noArticles: articles.length === 0
  })
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
    await articleModel.create(newArticle)

    res.redirect('/')
  }

  
  async updateArticle(req, res) {
    const updateData = {}

    if (req.body.name !== undefined) updateData.name = req.body.name
    if (req.body.slug !== undefined) updateData.slug = req.body.slug
    if (req.body.image !== undefined) updateData.image = req.body.image
    if (req.body.body !== undefined) updateData.body = req.body.body
    if (req.body.published !== undefined) updateData.published = req.body.published
    if (req.body.author_id !== undefined) updateData.author_id = req.body.author_id

    await articleModel.update(req.params.id, updateData)

    res.redirect('/')
  }


  async deleteArticle(req, res) {
    await articleModel.delete(req.params.id)
    res.redirect('/article/')
  }
}

module.exports = articleController;
