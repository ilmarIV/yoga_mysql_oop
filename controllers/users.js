const bcrypt = require('bcrypt')
const userDbModel = require('../models/user')
const userModel = new userDbModel()

class userController {
    async register(req, res) {
        const reqUsername = req.body.username;
        const reqEmail = req.body.email;
        const reqPassword = req.body.password;
        let reqRole = req.body.role

        const existingUser = await userModel.findOne(reqUsername)
        if (existingUser) {
            return res.render('register', { msg: 'Username already taken' })
        }

        if (!reqPassword || reqPassword.length < 6) {
            return res.render('register', { msg: 'Password must be at least 6 characters long' })
        }

        if (!reqRole || reqRole === 'user') {
            reqRole = 'user';
        } else if (reqRole === 'admin') {
            reqRole = 'admin';
        } else {
            return res.render('register', { msg: 'Invalid role. Only "user" or "admin" allowed.' })
        }

        const cryptPassword = await bcrypt.hash(reqPassword, 10)

        const registeredId = await userModel.create({
            username: reqUsername,
            email: reqEmail,
            password: cryptPassword,
            role: reqRole
        })

        if(registeredId) {
            const userData = await userModel.findById(registeredId)
            req.session.user = {
                username: userData.username,
                user_id: userData.id,
                role: userData.role
            }
            res.render('index', { 
                articles: [], 
                msg: `New user ${userData.username} registered successfully` 
            })
        }
    }


    async showLoginForm(req, res) {
        res.render('login')
    }


    async login(req, res) {
        const reqUsername = req.body.username
        const reqPassword = req.body.password

        const userData = await userModel.findOne(reqUsername)
        if (!userData) {
            return res.render('login', { msg: 'User not found' })
        }

        const passwordMatch = await bcrypt.compare(reqPassword, userData.password)
        if (!passwordMatch) {
            return res.render('login', { msg: 'Invalid password' })
        }

        req.session.user = {
            username: userData.username,
            user_id: userData.id,
            role: userData.role
        }

        res.render('index', { 
            articles: [],
            msg: `Welcome back, ${userData.username}`,
            user: req.session.user
        })
    }
}

module.exports = userController;