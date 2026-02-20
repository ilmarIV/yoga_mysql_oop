const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'yoga_mysql'
})

connection.connect((err) => {
    if (err) throw err
    console.log('mysql is connnected')
})

module.exports = connection