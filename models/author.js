const BaseSQLModel = require('./base');

class AuthorModel extends BaseSQLModel {
    constructor() {
        super('author');
    }

    async findAll() {
        const authors = await super.findAll()
        return authors
    }

    async findById(id) {
        const author = await super.findById(id)
        return author
    }
}
module.exports = AuthorModel;
