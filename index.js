// index.js
const express = require('express')
const sessions = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const hbs = require('express-handlebars')

// Import routes
const articleRoutes = require('./routes/articles')
const authorRoutes = require('./routes/authors')
const userRoutes = require('./routes/users')

const app = express()

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })) // for forms

// Sessions
app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}))

// Make session user available in all views
app.use((req, res, next) => {
    res.locals.user = req.session.user
    next()
})

// Handlebars setup with helper for role checks
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts/'),
    helpers: {
        ifEquals: function (a, b, options) {
            return a === b ? options.fn(this) : options.inverse(this)
        }
    }
}))

// Serve static files
app.use(express.static('public'))

// Routes
app.use('/', articleRoutes)
app.use('/', authorRoutes)
app.use('/', userRoutes)

// Default homepage route if needed
app.get('/', (req, res) => {
    res.render('index', { articles: [], msg: 'Welcome to the blog!' })
})

// Start server
const PORT = 3020
app.listen(PORT, () => {
    console.log(`Web server is connected at http://localhost:${PORT}`)
})