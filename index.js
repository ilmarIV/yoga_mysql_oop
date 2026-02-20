const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const articleRoutes = require('./routes/articles');
const authorRoutes = require('./routes/authors');

app.use('/', articleRoutes);
app.use('/', authorRoutes);

app.listen(3020, () => {
    console.log('web server is connected http://localhost:3020')
})