const BaseSQLModel = require('./base');

class UserModel extends BaseSQLModel {
    constructor() {
        super('users');
    }

    async findById(id) {
        const user = await super.findById(id)
        return user
    }

    async findOne(username) {
        const user = await super.findOne('username', username)
        return user
    }

    async create(user) {
        const createUserId = await super.create(user)
        return createUserId
    }

}
module.exports = UserModel;