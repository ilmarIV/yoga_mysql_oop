const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
    constructor() {
        super('article');
    }

    async findAll() {
        const articles = await super.findAll()
        return articles
    }

    async findOne(slug) {
        const article = await super.findOne('slug', slug)
        return article
    }

    async findMany(author_id) {
        const articles = await super.findMany('author_id', author_id)
        return articles
    }

    async create(article) {
        const createArticleId = await super.create(article)
        return createArticleId
    }

    async update(id, data) {
        const updateArticleData = await super.update(id, data)
        return updateArticleData
    }

    async delete(id) {
        const deleteArticleData = await super.delete(id)
        return deleteArticleData
    }
}
module.exports = ArticleModel;
