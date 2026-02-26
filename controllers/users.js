const bcrypt = require('bcrypt')
const userDbModel = require('../models/user')
const userModel = new userDbModel()

class userController {
    async register(req, res) {
        const reqUsername = req.body.username;
        const reqEmail = req.body.email;
        const reqPassword = req.body.password;

        const existingUser = await userModel.findOne(reqUsername)
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' })
        }

        if (!reqPassword || reqPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' })
        }
        const cryptPassword = await bcrypt.hash(reqPassword, 10)

        const registeredId = await userModel.create({
            username: reqUsername,
            email: reqEmail,
            password: cryptPassword
        })
        if(registeredId) {
            const userData = await userModel.findById(registeredId)
            req.session.user = {
                username: userData.username,
                user_id: userData.id
            }
            res.status(201).json({
                message: 'New user is registered.',
                user_session: req.session.user
            })
        }
    }

    async login(req, res) {
        const reqUsername = req.body.username
        const reqPassword = req.body.password

        const user = await userModel.findOne(reqUsername)
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        const passwordMatch = await bcrypt.compare(reqPassword, user.password)
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        req.session.user = {
            username: user.username,
            user_id: user.id
        }

        res.status(200).json({
            message: 'Login successful',
            user_session: req.session.user
        })
    }
}

module.exports = userController;